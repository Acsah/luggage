import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { StorageProvider } from '../storage/storage';

//引入MD5
import { Md5 } from "ts-md5/dist/md5";


/*
  Generated class for the ToolsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToolsProvider {

  constructor(public http: Http, public storage: StorageProvider) {
    console.log('Hello ToolsProvider Provider');
  }

  //LocalStorage 获取用户信息
  getUserInfo() {
    return this.storage.getItem('userInfo');
  }

  sign(json) {
    // let json = {
    //   name: 'zs',
    //   age: 20
    // }
    let temp = [];
    for (const attr in json) {
      temp.push(attr);
    }
    temp = temp.sort();  //属性按照 ASCII码排序
    let str = ''
    for (let i = 0;i < temp.length;i++) {
      str += temp[i] + json[temp[i]]

    }

    console.log(str);
    return Md5.hashStr(str);

    // console.log(Md5.hashStr("123456"));   //e10adc3949ba59abbe56e057f20f883e

  }

}
