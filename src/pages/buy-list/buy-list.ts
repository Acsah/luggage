import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SearchPage } from "../search/search";

/**
 * Generated class for the BuyListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buy-list',
  templateUrl: 'buy-list.html',
})
export class BuyListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyListPage');
  }

  goSearch(){
    this.navCtrl.push(SearchPage);
  }

}
