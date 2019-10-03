import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstrumentSearchPage } from './instrument-search';

@NgModule({
  declarations: [
    InstrumentSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(InstrumentSearchPage),
  ],
})
export class InstrumentSearchPageModule {}
