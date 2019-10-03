import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the MembershipPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'membership',
})
export class MembershipPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, ...args) {
    return value.filter((item)=>item.IsMembership);
  }
}
