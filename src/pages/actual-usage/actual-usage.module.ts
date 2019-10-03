import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActualUsagePage } from './actual-usage';

@NgModule({
  declarations: [
    ActualUsagePage,
  ],
  imports: [
   IonicPageModule.forChild(ActualUsagePage),
  ],
})
export class ActualUsagePageModule {}
