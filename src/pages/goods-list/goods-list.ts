import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConfigProvider } from "../../providers/config/config";
import { HttpServicesProvider } from "../../providers/http-services/http-services";

/**
 * Generated class for the GoodsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-goods-list',
  templateUrl: 'goods-list.html',
})
export class GoodsListPage {
  public goodsList = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpServices: HttpServicesProvider, public config: ConfigProvider) {
    this.getGoodsList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoodsListPage');
  }

  getGoodsList(){
    // 猜你喜欢：http://39.108.159.135/api/plist?is_hot=1
    this.httpServices.requestData('api/plist?is_hot=1',res=>{
      this.goodsList=res.result;
    })
  }
}
