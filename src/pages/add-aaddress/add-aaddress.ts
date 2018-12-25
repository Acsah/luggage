import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToolsProvider } from "../../providers/tools/tools";
import { HttpServicesProvider } from '../../providers/http-services/http-services';

/**
 * Generated class for the AddAaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-aaddress',
  templateUrl: 'add-aaddress.html',
})
export class AddAaddressPage {

  public addressList = {

    name: '',
    phone: '',
    address: ''

  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public tools: ToolsProvider, public httpService: HttpServicesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAaddressPage');
  }

  //添加地址
  addAddress() {
    if (this.addressList.name != '' || this.addressList.phone != '' || this.addressList.address != '') {
      //获取表单的内容
      let unserinfo = this.tools.getUserInfo();

      let json = {
        uid: unserinfo._id,
        salt: unserinfo.salt,
        name: this.addressList.name,
        phone: this.addressList.phone,
        address: this.addressList.address
      }

      let sign = this.tools.sign(json); /*生成签名*/

      var api = 'api/addAddress';
      this.httpService.postData(api, {
        uid: unserinfo._id,
        sign: sign,
        name: this.addressList.name,
        phone: this.addressList.phone,
        address: this.addressList.address
      }, (data) => {
        // console.log(data); 
        if (data.success) {/*增加成功 返回到地址列表*/
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
