import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivitydetailsPage } from './activitydetails';

@NgModule({
  declarations: [
    ActivitydetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivitydetailsPage),
  ],
})
export class ActivitydetailsPageModule {}
