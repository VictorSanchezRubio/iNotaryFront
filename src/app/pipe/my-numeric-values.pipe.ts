import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myNumericValues'
})
export class MyNumericValuesPipe implements PipeTransform {

  transform(items: any, tipo: string, escritura: string, areaEscritura: string, escfac: string): any {

    const options2 = { style: 'currency', 
                        currency: 'EUR',
                        minimumGroupingDigits: 0 };
/*
    console.log(typeof items);
    console.log("tipo:" + tipo);
    console.log("escritura:" + escritura);
    console.log("areaEscritura:" + areaEscritura);
    console.log("escfac:" + escfac);
*/
    if (typeof items != 'number') {

      if (tipo == "ES" && escritura == "PR" && areaEscritura !='CO' )  {
        if (items.split("-")[1]==' ') {
          return items.split("-")[0].replace("(","").replace(")","");
        } else {
        return items.split("-")[1];
        }
      } else {
      return items;
      }
    }


    switch (tipo) {

      case "ES":

        switch (escritura) {

          case "PR":

            switch (areaEscritura) {

              case "CO":

                return new Intl.NumberFormat("es-ES").format(items);

                break;

              case "AS":
              case "CL":
              case "EM":


                if (escfac == "EF") {

                  return new Intl.NumberFormat("es-ES", options2).format(items);

                } else {
                  return new Intl.NumberFormat("es-ES").format(items);
                }

            }

            break;
        }

        break;

      default:
        return new Intl.NumberFormat("es-ES", options2).format(items);
        break;

    }
    return items;
  }

}
