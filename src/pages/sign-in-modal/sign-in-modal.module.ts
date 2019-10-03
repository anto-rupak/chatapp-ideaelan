import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignInModalPage } from './sign-in-modal';

@NgModule({
  declarations: [
    SignInModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SignInModalPage),
  ],
})
export class SignInModalPageModule {}
