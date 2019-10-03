import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PinComponent } from './pin/pin';
import { OfflineComponent } from './offline/offline';
@NgModule({
	declarations: [PinComponent,OfflineComponent],
	imports: [IonicModule],
	exports: [PinComponent,OfflineComponent]
})
export class ComponentsModule {}
