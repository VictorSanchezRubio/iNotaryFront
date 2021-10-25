import { Combobox } from "../class/combobox";

export class GlobalFunctions {

    static newGuid(): String {
        return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
            .replace(/[xy]/g, function (c) {
                const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            })
    }

    static tranformProtocolo(nProtocolo: String, notarioDefecto: String): String {

        let newValue = "";
        let i = 0;

        let yearArray: string[];
        let year: number = 0;
        let Bis: string = "";
        let protocolo: string = "";

        if (nProtocolo !== "") {

            if (nProtocolo[0].toUpperCase() == "P" || nProtocolo[0].toUpperCase() == "C" || nProtocolo[0].toUpperCase() == "E") {
                newValue = nProtocolo[0].toUpperCase();
                i = 1;
            } else {
                newValue = "P";
                i = 0;
            }

            if (nProtocolo[i].match(/[A-Z]/gi)) {
                newValue = newValue + nProtocolo[i].toUpperCase();
                i++;
            } else {
                newValue = newValue + notarioDefecto;
            }

            if (nProtocolo.match(/[/]/)) {
                yearArray = nProtocolo.split("/");
                if (yearArray[1].match(/[B]/)) {
                    year = parseInt(yearArray[1].split("B")[0]);
                    Bis = "B";
                } else {
                    year = parseInt(yearArray[1]);
                }

                switch (year.toString().length) {

                    case 1:
                        year = 2000 + year;
                        break;

                    case 2:
                        if (year > 74) {
                            year = 1900 + year;
                        } else {
                            year = 2000 + year;
                        }
                        break;

                    case 3:
                        year = 1000 + year;
                        break;

                    case 4:
                        break;

                    default:
                        let ahora = new Date();
                        year = ahora.getFullYear();
                        break;
                }

                protocolo = ("00000" + yearArray[0].substr(i, yearArray[0].length));
            } else {
                let ahora = new Date();
                year = ahora.getFullYear();
                protocolo = ("00000" + nProtocolo.substr(i, nProtocolo.length));
            }

            protocolo = protocolo.substr(-5);
            newValue += protocolo + "/" + year + Bis;
        }

        return newValue;

    }

    static tranformPoliza(nProtocolo: String): String {

        let newValue = "";
        let i = 0;

        let yearArray: string[];
        let year: number = 0;
        let Bis: string = "";
        let protocolo: string = "";

        if (nProtocolo !== "") {

            if (nProtocolo[0].toUpperCase() == "P" || nProtocolo[0].toUpperCase() == "C" || nProtocolo[0].toUpperCase() == "E") {
                newValue = nProtocolo[0].toUpperCase();
                i = 1;
            } else {
                i = 0;
            }

            if (nProtocolo[i].match(/[A-Z]/gi)) {
                newValue = newValue + nProtocolo[i].toUpperCase();
                i++;
            }

            if (nProtocolo.match(/[/]/)) {
                yearArray = nProtocolo.split("/");
                if (yearArray[1].match(/[B]/)) {
                    year = parseInt(yearArray[1].split("B")[0]);
                    Bis = "B";
                } else {
                    year = parseInt(yearArray[1]);
                }

                switch (year.toString().length) {

                    case 1:
                        year = 2000 + year;
                        break;

                    case 2:
                        if (year > 74) {
                            year = 1900 + year;
                        } else {
                            year = 2000 + year;
                        }
                        break;

                    case 3:
                        year = 1000 + year;
                        break;

                    case 4:
                        break;

                    default:
                        let ahora = new Date();
                        year = ahora.getFullYear();
                        break;
                }

                protocolo = ("00000" + yearArray[0].substr(i, yearArray[0].length));
            } else {
                let ahora = new Date();
                year = ahora.getFullYear();
                protocolo = ("00000" + nProtocolo.substr(i, nProtocolo.length));
            }

            protocolo = protocolo.substr(-5);
            newValue += protocolo + "/" + year + Bis;
        }

        return newValue;

    }

    static removeDuplicates(originalArray: any[], objKey: any): any[] {

        let trimmedArray = [];
        let values = [];
        let value;
        let alta: Boolean = true;

        for (var i = 0; i < originalArray.length; i++) {
            alta = true;
            value = originalArray[i][objKey];

            for (var j = 0; j < values.length; j++) {
                if (value === values[j]) {
                    alta = false;
                    break;
                }
            }

            if (alta) {
                trimmedArray.push(originalArray[i]);
                values.push(value);
            }

        }


        return trimmedArray;


    }

    static replaceAll(textOriginal: any, valueOld: any, valueNew: any): any {
        if (textOriginal) {
           // if (valueOld) {
            //    if (valueNew) {
                    let regex = new RegExp(valueOld, 'g');
                    textOriginal = textOriginal.replace(regex, valueNew.toString());
            //    }
           // }
        }
        return textOriginal;
    }

    static valuesCombobox(_Combobox:Combobox[], _value:string): string[] {

        if (_value==null) {
            return [];
        }
    
        let _respuesta = [];
        for (let clave in _Combobox){
            if (_Combobox[clave].value==_value) {
                _respuesta=[_value, _Combobox[clave].viewValue];
            }
          }
    
        return _respuesta;
    }





    /*
        static removeDuplicates(originalArray:any, objKey:any): String[] {
            let trimmedArray = [];
            let values = [];
            let value;
          
            for(var i = 0; i < originalArray.length; i++) {
              value = originalArray[i][objKey];
          
             // if (originalArray[])
              if(values.indexOf(value) === -1) {
                trimmedArray.push(originalArray[i]);
                values.push(value);
              }
            }
          
            return trimmedArray;
          
          }
    */


}
