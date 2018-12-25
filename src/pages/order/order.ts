import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToolsProvider } from "../../providers/tools/tools";
import { StorageProvider } from "../../providers/storage/storage";
import { ConfigProvider } from "../../providers/config/config";
import { HttpServicesProvider } from '../../providers/http-services/http-services';

import { LoginPage } from '../login/login';
import { AddressPage } from "../address/address";
import { PaymentPage } from '../payment/payment';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  public list = [];  //订单列表
  public LoginPage = LoginPage;  //登录页
  public AddressPage = AddressPage;  //地址列表页面

  public userinfo = '';
  public defaultAddress = {};  //默认地址

  public totalPrice = 0; //总价

  constructor(public navCtrl: NavController, public navParams: NavParams, public tools: ToolsProvider, public storage: StorageProvider, public config: ConfigProvider, public httpService: HttpServicesProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }


  ionViewWillEnter() {
    //获取用户信息
    this.userinfo = this.tools.getUserInfo();
    //获取订单信息
    this.list = this.storage.getItem('order_data');
    // console.log(this.list);
    if (this.userinfo)  /*在用户登录的情况下，获取默认地址*/ {
      this.getDefaultAddress(this.userinfo);

    }

    if (this.list) {
      //有订单的情况下，计算总价
      this.sumPrice();
    }

  }

  //加载默认地址
  getDefaultAddress(userInfo) {
    if (!userInfo) {
      return;
    }
    let json = {
      uid: userInfo['_id'],
      salt: userInfo['salt']
    }
    let sign = this.tools.sign(json);
    //api/oneAddressList
    let url = 'api/oneAddressList?uid=' + userInfo['_id'] + "&sign=" + sign;
    this.httpService.requestData(url, res => {

      if (res.success) {
        this.defaultAddress = res.result[0];
      } else {
        alert(res.message);
      }
    })

  }

  //计算总价
  sumPrice() {
    for (const order of this.list) {
      this.totalPrice += order.product_count * order.product_price;
    }
    // alert(this.totalPrice)
  }

  //去支付
  goPay() {

    console.log(this.userinfo)

    console.log(this.defaultAddress);

    console.log(this.list);

    if (!this.userinfo) {
      this.navCtrl.push(LoginPage); //去登陆
    } else if (!this.defaultAddress) {
      alert('选择收货地址！');
    } else {
      //提交订单

      let userinfo: any = this.userinfo;
      var uid: any = userinfo['_id'];
      var address: any = this.defaultAddress['address'];
      var phone: any = this.defaultAddress['phone'];
      var name: any = this.defaultAddress['name'];
      var all_price = this.totalPrice;
      var products: any = JSON.stringify(this.list);

      //签名的字段
      let json = {
        uid: userinfo._id,
        salt: userinfo.salt,
        address: address,
        phone: phone,
        name: name,
        all_price: all_price
      }

      let sign = this.tools.sign(json);

      //请求数据
      let api = 'api/doOrder';
      this.httpService.postData(api, {
        uid: userinfo._id,
        salt: userinfo.salt,
        address: address,
        phone: phone,
        name: name,
        all_price: all_price,
        sign: sign,
        products: products

      }, (data) => {
        if (data.success) {
          this.navCtrl.push(PaymentPage);
          // alert('成功')

          console.log(data);
        } else {
          alert(data.message);
        }
      })

    }





  }


}
