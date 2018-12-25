import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule, JsonpModule } from "@angular/http";

import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';


import { GoodsListPage } from "../pages/goods-list/goods-list";
import { CategoryPage } from "../pages/category/category";
import { CartPage } from "../pages/cart/cart";
import { UserPage } from "../pages/user/user";
import { LoginPage } from "../pages/login/login";
import { PersonalPage } from "../pages/personal/personal";

import { RegisterPage } from "../pages/register/register";
import { RegistersignPage } from "../pages/registersign/registersign";
import { RegisterpasswordPage } from "../pages/registerpassword/registerpassword";
import { BuyListPage } from "../pages/buy-list/buy-list";
import { SearchPage } from "../pages/search/search";
import { GoodsDetailPage } from "../pages/goods-detail/goods-detail";
import { OrderPage } from "../pages/order/order";
import { AddressPage } from "../pages/address/address";
import { AddAaddressPage } from '../pages/add-aaddress/add-aaddress';
import { AddressEidtPage } from "../pages/address-eidt/address-eidt";


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigProvider } from '../providers/config/config';
import { HttpServicesProvider } from '../providers/http-services/http-services';
import { StorageProvider } from '../providers/storage/storage';
import { ToolsProvider } from '../providers/tools/tools';
import { PaymentPage } from "../pages/payment/payment";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    GoodsListPage,
    CategoryPage,
    CartPage,
    UserPage,
    LoginPage,
    PersonalPage,
    RegisterPage,
    RegistersignPage,
    RegisterpasswordPage,
    SearchPage,
    BuyListPage,
    GoodsDetailPage,
    OrderPage,
    AddressPage,
    AddAaddressPage,
    AddressEidtPage,
    PaymentPage
  ],
  imports: [
    BrowserModule,
    HttpModule, JsonpModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: 'true' //隐藏全部子页面 tabs 
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    GoodsListPage,
    CategoryPage,
    CartPage,
    UserPage,
    LoginPage,
    PersonalPage,
    RegisterPage,
    RegistersignPage,
    RegisterpasswordPage,
    SearchPage,
    BuyListPage,
    GoodsDetailPage,
    OrderPage,
    AddressPage,
    AddAaddressPage,
    AddressEidtPage,
    PaymentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConfigProvider,
    HttpServicesProvider,
    StorageProvider,
    ToolsProvider
  ]
})
export class AppModule { }
