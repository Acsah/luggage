
import { Injectable } from '@angular/core';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor() {
    console.log('Hello StorageProvider Provider');
  }

  //存值
  setItem(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  //取值
  getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  //删除
  removeItem(key) {
    localStorage.removeItem(key);
  }


}
