import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

//增加收货地址
import { AddAaddressPage } from "../add-aaddress/add-aaddress";
//修改地址
import { AddressEidtPage } from "../address-eidt/address-eidt";

import { ToolsProvider } from "../../providers/tools/tools";
import { HttpServicesProvider } from '../../providers/http-services/http-services';

/**
 * Generated class for the AddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {

  public AddAaddressPage = AddAaddressPage;

  public AddressEidtPage = AddressEidtPage;

  public addressList;

  public userInfo = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public tools: ToolsProvider, public httpService: HttpServicesProvider, public alertCtrl: AlertController) {

    this.userInfo = this.tools.getUserInfo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');

  }

  ionViewWillEnter() {
    this.getAddresssList(this.userInfo);
  }

  // 获取地址列表
  getAddresssList(userInfo) {

    let data = {
      uid: userInfo._id,
      salt: userInfo.salt
    }
    // 生成签名
    let sign = this.tools.sign(data);

    let url = 'api/addressList?uid=' + userInfo._id + '&sign=' + sign;
    this.httpService.requestData(url, res => {
      console.log(res.result);
      if (res.success) {
        this.addressList = res.result;
      }

    })


  }

  // 改变收获地址
  changeAddress(addressId) {
    if (!addressId) {
      return;
    }
    let user = this.userInfo;
    let json = {
      uid: user['_id'],
      salt: user['salt'],
      id: addressId
    }

    let sign = this.tools.sign(json);


    let data = {
      uid: user['_id'],
      sign: sign,
      id: addressId
    }

    this.httpService.postData('api/changeDefaultAddress', data, res => {
      console.log(res);
      if (res.success) {
        this.navCtrl.pop();
      } else {
        alert(res.message);
      }
    })
  }


  //长按删除当前地址
  delete(index, id) {
    const confirm = this.alertCtrl.create({
      title: '确定要删除吗?',
      message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            console.log('Agree clicked');

            this.deleteFromService(index, id);


          }
        }
      ]
    });
    confirm.present();
  }


  //从服务器删除
  deleteFromService(index, id) {
    let user = this.userInfo;
    let json = {
      uid: user['_id'],
      salt: user['salt'],
      id: id
    }
    let sign = this.tools.sign(json);
    let data = {
      uid: user['_id'],
      sign: sign,
      id: id
    }
    this.httpService.postData('api/deleteAddress', data, res => {
      if (res.success) {
        //本地删除
        this.addressList.splice(index, 1);
        console.log(this.addressList);
      } else {
        alert(res.message);
      }
    })
  }


}
