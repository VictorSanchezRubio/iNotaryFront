import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ivaRet'
})
export class IvaRetPipe implements PipeTransform {

  transform(value: any, contains: String = 'IVA'): string {
    let visible = "";

    if (value) {
      contains = contains + "=SI";
      if (value.indexOf(contains) != -1) {
        visible = "*";
      }
    }
    return visible;
  }

}
