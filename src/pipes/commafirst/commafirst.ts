import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CommafirstPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'commafirst',
})
export class CommafirstPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
  //  return value.slice(0, value.indexOf(','))
  return 'hello'
  }
}
