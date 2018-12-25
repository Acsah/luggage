import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RegisterpasswordPage } from "../registerpassword/registerpassword";
import { HttpServicesProvider } from "../../providers/http-services/http-services";


/**
 * Generated class for the RegistersignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registersign',
  templateUrl: 'registersign.html',
})
export class RegistersignPage {

  public tel = '';//手机号
  public verCode = '';//验证码
  public num = 60; //倒计时
  public isSend = false;//是否显示重新发送按钮
  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpServicesProvider) {

    this.tel = this.navParams.get("tel");//参数中读取电话号码
  }

  ionViewDidLoad() {
    this.setTimer();
    console.log('ionViewDidLoad RegistersignPage');
  }

  //开启
  setTimer() {
    let timer = setInterval(() => {
      --this.num;
      if (this.num == 0) {
        clearInterval(timer);
        this.isSend = true;
      }
    }, 1000)
  }

  //重新发送
  reSend() {
    this.httpService.postData('api/sendCode', { "tel": this.tel }, res => {
      if (res.success) {
        // this.navCtrl.push(RegistersignPage, { "tel": this.tel });
        this.setTimer();
        this.num = 60; //重新倒计时
        this.isSend = false; //显示按钮
      } else {
        alert(res.message);
      }
    })

  }

  //验证验证码，去下一页
  goRegPwd() {
    var data = {
      "tel": this.tel,
      "code": this.verCode      
    }
    this.httpService.postData('api/validateCode', data, res => {
      console.log(res);
      if (res.success) {
        this.navCtrl.push(RegisterpasswordPage, { "tel": this.tel, "code": this.verCode });
      } else {
        alert(res.message);
      }
    })
  }

}
