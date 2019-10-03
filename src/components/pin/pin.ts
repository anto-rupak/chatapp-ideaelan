import { Component, Input, Output, EventEmitter  } from '@angular/core';

/**
 * Generated class for the PinComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "custom-pin",
  templateUrl: "pin.html"
})
export class PinComponent {
  @Input() pagetitle: String = "Enter Pin";

  pin:string= "";

  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  text: string;

  constructor() {
    
    this.text = 'Hello World';
  }
  emitEvent() {
    this.change.emit(this.pin);
  }

  handleInput(pin: string) {
    if (pin === "clear") {
      this.pin = "";
      return;
    }

    if (this.pin.length === 5) {
      return;
    }
    this.pin += pin;
  }
}
