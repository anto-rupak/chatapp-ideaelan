import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LabDashboardPage } from './lab-dashboard';

@NgModule({
  declarations: [
    LabDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(LabDashboardPage),
  ],
})
export class LabDashboardPageModule {}
