import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeneralChatPage } from './general-chat';

@NgModule({
  declarations: [
    GeneralChatPage,
  ],
  imports: [
    IonicPageModule.forChild(GeneralChatPage),
  ],
})
export class GeneralChatPageModule {}
