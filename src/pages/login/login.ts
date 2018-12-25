import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpServicesProvider } from "../../providers/http-services/http-services";
import { StorageProvider } from "../../providers/storage/storage";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public name = '';
  public pwd = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpServicesProvider, public storage: StorageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }



  toLogin() {
    if (this.name == '' || this.pwd == '') {
      alert('账号或密码不能为空！')
    } else {
      let data = {
        "username": this.name,
        "password": this.pwd
      }
      // 址：http://39.108.159.135/api/doLogin

      this.httpService.postData('api/doLogin', data, res => {
        console.log(res)
        if (res.success) {
          this.storage.setItem('userInfo', res.userinfo[0]);
          alert(res.message);
          this.navCtrl.popToRoot();//注册成功，返回到根页面
        } else {
          alert(res.message);
        }
      })
    }
  }





}
