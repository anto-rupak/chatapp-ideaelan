import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllchatsPage } from './allchats';

@NgModule({
  declarations: [
    AllchatsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllchatsPage)
  ],
})
export class AllchatsPageModule {}
