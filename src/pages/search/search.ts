import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, AlertController } from 'ionic-angular';

import { ConfigProvider } from "../../providers/config/config";
import { HttpServicesProvider } from "../../providers/http-services/http-services";
import { StorageProvider } from "../../providers/storage/storage";


/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  //装饰器    this.content.scrollToTop();回到顶部
  @ViewChild(Content) content: Content;

  public flag = false;  /*有没有关键词、关键词开关*/

  public list = [];  /*模拟商品数据*/

  public keywords = '';  // 搜索内容
  public page;  //当前页

  public hasData = true;//是否有数据

  public historyList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpServices: HttpServicesProvider, public config: ConfigProvider, public storage: StorageProvider, public alertCtrl: AlertController) {

    //获取历史搜索列表
    this.getHistory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  getSearchList(infiniteScroll) {
    if (!infiniteScroll) {  /*点击搜索按钮*/
      this.page = 1;
      this.list = [];  //每次点击搜索，清空列表
      this.hasData = true;
      this.content.scrollToTop(0); /*回到顶部*/
      this.saveHistory();
    }

    var api = 'api/plist?search=' + this.keywords + '&page=' + this.page;
    this.httpServices.requestData(api, data => {
      console.log("页数：" + this.page + "  数据：" + data.result.length);
      if (this.page == 1) {  /*第一页 替换数据*/
        this.list = data.result;

      } else {
        this.list = this.list.concat(data.result);  /*拼接数据*/
      }

      if (infiniteScroll) {
        infiniteScroll.complete();
        if (data.result.length < 10) {
          console.log("第" + this.page + '页 ' + data.result.length + '条')
          this.hasData = false;
        }
      }

      this.flag = true;  /*显示商品列表*/
      this.page++;
    })
  }

  //上拉加载更多
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.getSearchList(infiniteScroll);

  }

  //获取历史搜索列表
  getHistory() {
    //本地有没有historyData 的存储
    let historySearch = this.storage.getItem('historyData');
    if (historySearch == null) {
      this.storage.setItem('historyData', this.historyList);

    } else {
      console.log(historySearch);
      this.historyList = historySearch;
    }

  }

  //保存历史搜索列表
  saveHistory() {
    //没有关键字 ，添加到列表，存值
    if (this.historyList.indexOf(this.keywords) == -1) {
      this.historyList.push(this.keywords);
      this.storage.setItem('historyData', this.historyList);
    }
  }

  //点击历史去搜索
  goSearch(key) {
    this.keywords = key;
    this.getSearchList('');
  }

  // 长按删除
  removeHistory(item) {
    const confirm = this.alertCtrl.create({
      title: '确定要删除吗?',
      message: '删除点确定，否则取消?',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('取消删除');
          }
        },
        {
          text: '确定',
          handler: () => {
            let index = this.historyList.indexOf(item);
            this.historyList.splice(index, 1);
            this.storage.setItem('historyData', this.historyList);
          }
        }
      ]
    });
    confirm.present();
  }





}
