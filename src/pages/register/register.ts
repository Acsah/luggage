import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistersignPage } from "../registersign/registersign";

import { HttpServicesProvider } from "../../providers/http-services/http-services";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public tel: ';'
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpServicesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  //下一步
  goRegistersignPage() {

    if (/^\d{11}$/.test(this.tel)) {
      this.httpService.postData('api/sendCode', { "tel": this.tel }, res => {
        if (res.success) {
          this.navCtrl.push(RegistersignPage, { "tel": this.tel });
        } else {
          alert(res.message);
        }
      })
    } else {
      alert('电话号码错误！');
    }



  }


}
