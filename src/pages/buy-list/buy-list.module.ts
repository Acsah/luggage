import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyListPage } from './buy-list';

@NgModule({
  declarations: [
    BuyListPage,
  ],
  imports: [
    IonicPageModule.forChild(BuyListPage),
  ],
})
export class BuyListPageModule {}
