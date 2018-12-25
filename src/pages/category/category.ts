import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from "../../providers/config/config";
import { HttpServicesProvider } from "../../providers/http-services/http-services";

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {
  public leftList = [];
  public rightList = [];
  public rightImgs = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpServices: HttpServicesProvider, public config: ConfigProvider) {

    this.getLeftCate();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

  // 一级分类：
  // http://39.108.159.135/api/pcate
  getLeftCate() {
    this.httpServices.requestData('api/pcate', res => {
      this.leftList = res.result;
      console.log(this.leftList[0])
      this.getRightGoods(this.leftList[0]._id)
    })
  }

  //   二级分类：
  // http://39.108.159.135/api/pcate?pid=59f1e1ada1da8b15d42234e9
  getRightGoods(cateId) {
    this.httpServices.requestData("api/pcate?pid=" + cateId, res => {
      this.rightList = res.result;
    })
  }



}
