import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HttpServicesProvider } from "../../providers/http-services/http-services";

import { CategoryPage } from "../category/category";
import { CartPage } from "../cart/cart";
import { UserPage } from "../user/user";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public CategoryPage = CategoryPage;
  public CartPage = CartPage;
  public UserPage = UserPage;
  constructor(public navCtrl: NavController, public httpServer: HttpServicesProvider) {

  }

  getSlider(){
    this.httpServer.requestData('api/focus', data=>{
      
      console.log("res:" + data.result);
    })
  }

}
