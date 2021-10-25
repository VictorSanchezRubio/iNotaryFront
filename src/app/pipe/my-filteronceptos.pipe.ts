import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFilteronceptos'
})
export class MyFilteronceptosPipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    if (filter == 'TO') {
      return items;
    }


    if (filter == 'PO') {
      return items.filter(item => JSON.stringify(item).toLowerCase().indexOf("17") !== -1);
    }

    if (filter == 'PR') {
      return items.filter(item => JSON.stringify(item).toLowerCase().indexOf("17") === -1);
    }

/*
    return items.filter(item => JSON.stringify(item).toLowerCase().indexOf(filter.toLowerCase()) !== -1);
*/    
  }

}
