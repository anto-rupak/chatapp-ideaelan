import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewanimalPage } from './viewanimal';

@NgModule({
  declarations: [
    ViewanimalPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewanimalPage),
  ],
})
export class ViewanimalPageModule {}
