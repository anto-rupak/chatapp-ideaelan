import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NaviPage } from './navi';
import { IonicImageLoader } from 'ionic-image-loader';
import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';
@NgModule({
  declarations: [
    NaviPage,
  ],
  imports: [
    IonicPageModule.forChild(NaviPage),
    IonicImageLoader,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    })
  ],
})
export class NaviPageModule {}
