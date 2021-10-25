import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tooltipDivide'
})
export class TooltipDividePipe implements PipeTransform {

  transform(value: any, trail: String = ',', txtShort: String = 'CON', txtLong: String = "Num. Conceptos: "): string[] {

    let result = value || '';

    if (value) {
      const words = value.split(trail);

      let phrases = [];
      let contador = 1;
      for (let bucle=0; bucle<words.length; bucle++)
      {
        if (words[bucle] != "" && words[bucle] != " " && words[bucle] != null ) {
          if (txtShort!=="") {
            phrases.push(txtShort + " " + contador.toString() + " --> " + words[bucle]);
          } else {
            phrases.push(words[bucle]);
          }
            contador++;
        }


      }
      contador--;
      if (txtLong!=="") {
      phrases.push(" ");
      phrases.push(txtLong + " " + contador.toString());
    }
      result = phrases.join('\r\n');
     // result = words.join('\r\n');
    }
    return result;
  }

}
