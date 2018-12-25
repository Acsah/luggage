import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpServicesProvider } from "../../providers/http-services/http-services";
import { StorageProvider } from "../../providers/storage/storage";

/**
 * Generated class for the RegisterpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registerpassword',
  templateUrl: 'registerpassword.html',
})
export class RegisterpasswordPage {

  public code = '';
  public tel = '';
  public pwd1 = '';
  public pwd2 = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpServicesProvider, public storage: StorageProvider) {
    this.code = this.navParams.get('code');
    this.tel = this.navParams.get('tel');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterpasswordPage');
  }

  doneReg() {
    if (this.pwd1 !== this.pwd2) {
      alert('两次密码不一样！');
    } else {
      let data = {
        tel: this.tel,
        password: this.pwd1,
        code: this.code
      }
      this.httpService.postData('api/register', data, res => {
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
