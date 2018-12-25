import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToolsProvider } from "../../providers/tools/tools";
import { HttpServicesProvider } from "../../providers/http-services/http-services";
import { StorageProvider } from "../../providers/storage/storage";

/**
 * Generated class for the AddressEidtPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address-eidt',
  templateUrl: 'address-eidt.html',
})
export class AddressEidtPage {

  public addressList = {

    name: '',
    phone: '',
    address: ''

  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public tools: ToolsProvider, public httpService: HttpServicesProvider, public storage: StorageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressEidtPage');
  }

  ionViewWillEnter() {

    this.addressList = this.navParams.get('item');
    console.log('地址：' + this.addressList)
  }
  //修改地址
  editAddress(id) {
    if (this.addressList.name != '' || this.addressList.phone != '' || this.addressList.address != '') {
      //获取表单的内容
      let unserinfo = this.tools.getUserInfo();
      let address=this.addressList;

      let json = {
        uid: unserinfo._id,
        salt: unserinfo.salt,
        id:id,
        name: address.name,
        phone: address.phone,
        address: address.address
      }

      let sign = this.tools.sign(json); /*生成签名*/

      var api = 'api/editAddress';
      this.httpService.postData(api, {
        uid: unserinfo._id,
        id: id,
        sign: sign,
        name: address.name,
        phone: address.phone,
        address: address.address
      }, (data) => {
        // console.log(data); 
        if (data.success) {/*增加成功 返回到地址列表*/
          // this.storage.setItem('carts_data',)
          this.navCtrl.pop();
        } else {
          alert(data.message)
        }
      })

    } else {
      alert('收货地址不对');
    }
  }



}
