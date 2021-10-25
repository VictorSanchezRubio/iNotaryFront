import { ChartOptions } from "chart.js";
import { Combobox } from "src/app/class/combobox";

export class GlobalValues {

    public static tipos: Combobox[] = [
        { "value": "ES", viewValue: "Escrituras" },
        { "value": "FC", viewValue: "Facturación" },
        { "value": "GS", viewValue: "Gastos" }
      ];

      public static escrituras: Combobox[] = [
        { "value": "PR", viewValue: "Protocolos" },
        { "value": "PO", viewValue: "Pólizas" },
        { "value": "TO", viewValue: "Todas" }
      ];
    
      
      public static areaEscrituras: Combobox[] = [
        { "value": "CO", viewValue: "Conceptos" },
        { "value": "CL", viewValue: "Clientes" },
        { "value": "AS", viewValue: "Asesores" },
        { "value": "EM", viewValue: "Empleados" },
      ];
    
      public static periodo: Combobox[] = [
        { "value": "ANU", viewValue: "Anual" },
        { "value": "EFE", viewValue: "Por Fechas" },
        { "value": "MEN", viewValue: "Mensual" },
        { "value": "TRI", viewValue: "Trimestral" },
        { "value": "SEM", viewValue: "Semestral" },
      ];
    
      public static anualidades: Combobox[] = [
        { "value": "0", viewValue: "Actual" },
        { "value": "1", viewValue: "1 Año" },
        { "value": "2", viewValue: "2 Años" },
        { "value": "3", viewValue: "3 Años" },
        { "value": "4", viewValue: "4 Años" },
        { "value": "5", viewValue: "5 Años" },
      ];
    
    
      public static charts: Combobox[] = [
        { "value": "BR", viewValue: "Barras" },
        { "value": "DO", viewValue: "Doughnut" },
        { "value": "PO", viewValue: "Polar" }
      ];
    
      public static conceptos: Combobox[] = [
        { "value": "01", viewValue: "01 - ACTOS DE ORDEN FAMILIAR Y PERSONAL" },
        { "value": "02", viewValue: "02 - TESTAMENTOS Y DISPOSICIONES DE ULTIMA VOLUNTAD" },
        { "value": "03", viewValue: "03 - CONTRATOS POR RAZON DE MATRIMONIO Y ACTOS RELATIVOS A UNIONES O SEPARACIONES DE HECHO" },
        { "value": "04", viewValue: "04 - ACTOS QUE IMPLICAN MODIFICACION FISICA SOBRE LAS FINCAS" },
        { "value": "05", viewValue: "05 - CONTRATOS TRASLATIVOS SOBRE TODO TIPO DE BIENES Y DERECHOS" },
        { "value": "06", viewValue: "06 - CONTRATOS DE ARRENDAMIENTO Y CESIONES DE USO" },
        { "value": "07", viewValue: "07 - DONACIONES Y TRANSMISIONES GRATUITAS INTER VIVOS" },
        { "value": "08", viewValue: "08 - PACTOS ACUMULABLES A NEGOCIOS JURIDICOS PRINCIPALES, INDEPENDIENTES O NO" },
        { "value": "09", viewValue: "09 - ACTOS URBANISTICOS" },
        { "value": "10", viewValue: "10 - OTROS ACTOS Y CONTRATOS" },
        { "value": "11", viewValue: "11 - HERENCIAS" },
        { "value": "12", viewValue: "12 - CREDITOS, PRESTAMOS Y GARANTIAS HIPOTECARIAS" },
        { "value": "13", viewValue: "13 - CARTAS DE PAGO Y CANCELACIONES" },
        { "value": "14", viewValue: "14 - APODERAMIENTOS" },
        { "value": "15", viewValue: "15 - PROTESTOS" },
        { "value": "16", viewValue: "16 - ACTAS" },
        { "value": "17", viewValue: "17 - POLIZAS Y OTROS DOCUMENTOS MERCANTILES SUJETOS AL ANTIGUO ARANCEL DE CORREDORES" },
        { "value": "18", viewValue: "18 - ENTIDADES SIN PERSONALIDAD JURIDICA" },
        { "value": "19", viewValue: "19 - ENTIDADES CON PERSONALIDAD JURIDICA" }
    
      ];
    
      public static topTen: Combobox[] = [
        { value: "5", viewValue: "Top 5" },
        { value: "10", viewValue: "Top 10" },
        { value: "15", viewValue: "Top 15" },
        { value: "0", viewValue: "All" },
      ];
    
      public static meses: Combobox[] = [
        { "value": "01", viewValue: "Enero" },
        { "value": "02", viewValue: "Febrero" },
        { "value": "03", viewValue: "Marzo" },
        { "value": "04", viewValue: "Abril" },
        { "value": "05", viewValue: "Mayo" },
        { "value": "06", viewValue: "Junio" },
        { "value": "07", viewValue: "Julio" },
        { "value": "08", viewValue: "Agosto" },
        { "value": "09", viewValue: "Septiembre" },
        { "value": "10", viewValue: "Octubre" },
        { "value": "11", viewValue: "Noviembre" },
        { "value": "12", viewValue: "Diciembre" }
      ];
    
      public static trimestres: Combobox[] = [
        { "value": "01", viewValue: "1er Trimestre" },
        { "value": "02", viewValue: "2o Trimestre" },
        { "value": "03", viewValue: "3rt Trimestre" },
        { "value": "04", viewValue: "4o Trimestre" }
      ];
    
      public static semestres: Combobox[] = [
        { "value": "01", viewValue: "1er Semestre" },
        { "value": "02", viewValue: "2o Semestre" }
      ];
    
    
      public static escfac: Combobox[] = [
        { "value": "NE", viewValue: "Núm. Escrituras" },
        { "value": "EF", viewValue: "€ Facturados" }
      ];
    
    
      public static tipocliente: Combobox[] = [
        { "value": "1", viewValue: "Personas Físicas" },
        { "value": "2", viewValue: "Personas Jurídicas" },
        { "value": "3", viewValue: "Entidades Financieras" },
        { "value": "0", viewValue: "Todas" }
      ];
    
    
      public static barChartOptionsDefault: ChartOptions = {
        responsive: true,
        scales: { xAxes: [{}], yAxes: [{}] },
        title: {
          text: '',
          fontSize: 20,
          fontColor: 'rgba(0,0,0,1)',
          display: true
        },
        legend: {
          position: 'bottom', // 'right',
    
        },
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end',
          }
        }
      };
    
      public static barChartOptionsBarApi: ChartOptions = {
        responsive: true,
        scales: {
          xAxes: [{
            stacked: true
          }], yAxes: [{
            stacked: true
          }]
        },
        title: {
          text: '',
          fontSize: 20,
          fontColor: 'rgba(0,0,0,1)',
          display: false
        },
        legend: {
          position: 'bottom',
        },
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end',
          }
        }
    
      };
    
      public static barChartOptionsSemiCircle: ChartOptions = {
        responsive: true,
        title: {
          text: '',
          fontSize: 20,
          fontColor: 'rgba(0,0,0,1)',
          display: false
        },
        legend: {
          position: 'bottom',
        },
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end',
          }
        },
        circumference: Math.PI,
        rotation: - Math.PI,
        tooltips: {
          intersect: true,
          mode: 'index',
          callbacks: {
            label: function (tooltipItem, myData) {
              var label = myData.datasets[tooltipItem.datasetIndex].label || '';
              if (label) {
                label += ": ";
              }
              label += myData.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              return label;
            }
          }
        }
    
      };
    
      public static barChartOptionsCircle: ChartOptions = {
        responsive: true,
        title: {
          text: '',
          fontSize: 20,
          fontColor: 'rgba(0,0,0,1)',
          display: false
        },
        legend: {
          position: 'bottom',
        },
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end',
          }
        },
        circumference: Math.PI * 2,
        rotation: - Math.PI / 2,
        tooltips: {
          intersect: true,
          mode: 'index',
          callbacks: {
            label: function (tooltipItem, myData) {
              var label = myData.datasets[tooltipItem.datasetIndex].label || '';
              if (label) {
                label += ": ";
              }
              label += myData.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
    
   
              return label;
            }
          }
        }
    
      };


}
