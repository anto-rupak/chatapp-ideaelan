import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuppliesOrderPage } from './supplies-order';

@NgModule({
  declarations: [
    SuppliesOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(SuppliesOrderPage),
  ],
})
export class SuppliesOrderPageModule {}
