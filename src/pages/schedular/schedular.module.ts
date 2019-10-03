import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchedularPage } from './schedular';

@NgModule({
  declarations: [
    SchedularPage,
  ],
  imports: [
    IonicPageModule.forChild(SchedularPage),
  ],
})
export class SchedularPageModule {}
