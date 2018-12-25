import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { RegisterPage } from "../register/register";

import { PersonalPage } from "../personal/personal";
import { OrderPage } from "../order/order";

import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  public LoginPage = LoginPage;

  public RegisterPage = RegisterPage;
  
  public PersonalPage = PersonalPage;

  public OrderPage = OrderPage;

  public userinfo={};


  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:StorageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
    //   console.log("1.0 ionViewDidLoad 当页面加载的时候触发，仅在页面创建的 时候触发一次，如果被缓存了，那么下次再打开这个页面则不会触发");
  }


  ionViewWillEnter() {
    console.log("2.0 ionViewWillEnter 顾名思义，当将要进入页面时触发");

    let userData=this.storage.getItem('userInfo');
    console.log(userData);
    // if(userData){
      this.userinfo=userData;
    // }


  }

  ionViewDidEnter() {
    console.log("3.0 ionViewDidEnter 当进入页面时触发");
  }


  // ionViewWillLeave() {
  //   console.log("4.0 ionViewWillLeave 当将要从页面离开时触发");
  // }

  // ionViewDidLeave() {
  //   console.log("5.0 ionViewDidLeave 离开页面时触发");
  // }

  // ionViewWillUnload() {
  //   console.log("6.0 ionViewWillUnload 当页面将要销毁同时页面上元素移除 时触发");
  // }

  // ionViewCanEnter() {
  //   console.log("ionViewCanEnter");
  // }

  // ionViewCanLeave() {
  //   console.log("ionViewCanLeave");
  // }




}
