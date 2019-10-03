import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InboxviewPage } from './inboxview';

@NgModule({
  declarations: [
    InboxviewPage,
  ],
  imports: [
    IonicPageModule.forChild(InboxviewPage),
  ],
})
export class InboxviewPageModule {}
