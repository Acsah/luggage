import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAaddressPage } from './add-aaddress';

@NgModule({
  declarations: [
    AddAaddressPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAaddressPage),
  ],
})
export class AddAaddressPageModule {}
