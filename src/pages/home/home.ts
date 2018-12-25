import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpServicesProvider } from "../../providers/http-services/http-services";
import { ConfigProvider } from "../../providers/config/config";



import { GoodsListPage } from "../goods-list/goods-list";
import { BuyListPage } from "../buy-list/buy-list";
import { GoodsDetailPage } from "../goods-detail/goods-detail";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public bestList = [];
  public bestListWidth = '';
  public GoodsListPage = GoodsListPage;
  public BuyListPage = BuyListPage;
  public GoodsDetailPage = GoodsDetailPage;//商品详情页面 
  constructor(public navCtrl: NavController, public httpService: HttpServicesProvider, public config: ConfigProvider) {

    this.getBestGoods();

  }

  // ：http://39.108.159.135/api/plist?is_best=1
  getBestGoods() {
    this.httpService.requestData('api/plist?is_best=1', data => {
      this.bestList = data.result;
      //动态设置ul宽度
      this.bestListWidth = this.bestList.length * 74 + 'px';
    })
  }


}