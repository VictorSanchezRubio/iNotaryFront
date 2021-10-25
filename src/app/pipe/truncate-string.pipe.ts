import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateString'
})
export class TruncateStringPipe implements PipeTransform {

  transform(value: any, limit: number = 40, trail: String = '…'): string {

    let result = value || '';

    if (value) {
      if (value.length > Math.abs(limit))
      {
        result = value.slice(0,limit) + ' ' + trail;


      }


      /*
      const words = value.split(/\s+/);
      if (words.length > Math.abs(limit)) {
        if (limit < 0) {
          limit *= -1;
          result =
            trail + words.slice(words.length - limit, words.length).join(' ');
        } else {
          result = words.slice(0, limit).join(' ') + trail;
        }
      }
      */

    }

    return result;
  }

}
