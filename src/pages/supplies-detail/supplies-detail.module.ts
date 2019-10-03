import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuppliesDetailPage } from './supplies-detail';

@NgModule({
  declarations: [
    SuppliesDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SuppliesDetailPage),
  ],
})
export class SuppliesDetailPageModule {}
