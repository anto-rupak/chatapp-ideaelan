import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatContentPage } from './chat-content';
//import { ImageLoaderConfig } from 'ionic-image-loader';
import { IonicImageLoader } from 'ionic-image-loader';
@NgModule({
  declarations: [
    ChatContentPage,
  
  ],
  imports: [
    IonicPageModule.forChild(ChatContentPage),
    IonicImageLoader
  ],
})
export class ChatContentPageModule {}
