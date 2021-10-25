import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets} from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { GlobalConstant } from 'src/app/global/global-constant';
import { WpxServicesService } from 'src/app/services/wpx-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  public barChartDataIncome: ChartDataSets[] = [];
  public barChartLabelsInCome: Label[] = [];
  public barChartOptionsIncome: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    title: {
      text: 'Facturado / Gastos / Beneficios',
      fontSize: 20,
      fontColor: 'rgba(0,0,0,1)',
      display: true
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

  public barChartColorsIncome: Color[] = [];
  public barChartTypeIncome: ChartType = 'bar';
  public barChartLegendIncome = true;



  public barChartDataNProt: ChartDataSets[] = [];
  public barChartLabelsNProt: Label[] = [];
  public barChartOptionsNProt: ChartOptions = {
    responsive: true,
    // scales: { xAxes: [{}], yAxes: [{}] },
    title: {
      text: 'Núm. de Protocolos',
      fontSize: 20,
      fontColor: 'rgba(0,0,0,1)',
      display: true
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
    rotation: -Math.PI,

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

  public barChartColorsNProt: Color[] = [];
  public barChartTypeNProt: ChartType = 'doughnut';
  public barChartLegendNProt = true;




  public barChartDataNPol: ChartDataSets[] = [];
  public barChartLabelsNPol: Label[] = [];
  public barChartOptionsNPol: ChartOptions = {
    responsive: true,
    // scales: { xAxes: [{}], yAxes: [{}] },
    title: {
      text: 'Núm. de Pólizas',
      fontSize: 20,
      fontColor: 'rgba(0,0,0,1)',
      display: true
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
    ,

    circumference: Math.PI,
    rotation: -Math.PI,

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

  public barChartColorsNPol: Color[] = [];
  public barChartTypeNPol: ChartType = 'polarArea'; //'doughnut';
  public barChartLegendNPol = true;





  public barChartDataPend: ChartDataSets[] = [];
  public barChartLabelsPend: Label[] = [];
  public barChartOptionsPend: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true
      }], yAxes: [{
        stacked: true
      }]
    },
    title: {
      text: 'Facturado / Cobrado / Pendiente',
      fontSize: 20,
      fontColor: 'rgba(0,0,0,1)',
      display: true
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

  public barChartColorsPend: Color[] = [];
  public barChartTypePend: ChartType = 'bar';
  public barChartLegendPend = true;


  public barChartData: ChartDataSets[] = [
    { data: [5, 10], label: 'IE00B0M62S72 - iShares Euro Dividend UCITS ETF EUR' },
    { data: [20, 40], label: 'IE00B14X4T88 - iShares Asia Pacific Dividend UCITS ETF USD' },
    { data: [9, 4], label: 'IE00B0M63177 - iShares MSCI Emerging Markets UCITS ETF' },
    { data: [15, 10], label: 'IE00B27YCK28 - iShares MSCI EM Latin America UCITS ETF USD' }
  ];

  // Eje X
  public barChartLabels: Label[] = ['2019', '2020'];

  // Opciones de la gráfica
  public barChartOptions: ChartOptions = {
    responsive: true,
    // maintainAspectRatio: false,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    /*
     scales: { xAxes: [{
      stacked:true
    }], yAxes: [{
      stacked:true
    }] },
    */
    title: {
      text: 'Dividendo Anual',
      fontSize: 20,
      fontColor: 'rgba(0,0,0,1)',
      display: true
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

  // Colores de las barras
  public barChartColors: Color[] = [
    { // Euro - Azul
      backgroundColor: 'rgba(0,0,255,1)',
      borderColor: 'rgba(0,0,255,1)',
      hoverBackgroundColor: 'rgba(0,0,255,1)',
      hoverBorderColor: 'rgba(0,0,255,1)'
    },
    { // Asia - Rojo
      backgroundColor: 'rgba(255,0,0,1)',
      borderColor: 'rgba(255,0,0,1)',
      hoverBackgroundColor: 'rgba(255,0,0,1)',
      hoverBorderColor: 'rgba(255,0,0,1)'
    },
    { // Emerging Markets - Amarillo
      backgroundColor: 'rgba(255,255,0,1)',
      borderColor: 'rgba(255,255,0,1)',
      hoverBackgroundColor: 'rgba(255,255,0,1)',
      hoverBorderColor: 'rgba(255,255,0,1)'
    },
    { // Latin America - Verde
      backgroundColor: 'rgba(0,255,0,1)',
      borderColor: 'rgba(0,255,0,1)',
      hoverBackgroundColor: 'rgba(0,255,0,1)',
      hoverBorderColor: 'rgba(0,255,0,1)'
    }
  ];

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

 
  constructor(private servicesWpx: WpxServicesService) { }

  ngOnInit(): void {
    this.dashboard("1");
    this.dashboard("2");
    this.dashboard("3");
    this.dashboard("4");
  }


  public dashboard(dashType: string): void {

    let seleccion = '{"usr":"' + GlobalConstant.userLogin + '","dashType":"' + dashType + '"}';

    this.servicesWpx.loadDashboard(seleccion)
      .subscribe(
        data => {
          let datos = data["detail"];
          console.log(datos);

          switch (dashType) {

            case "1":
              this.barChartDataIncome = [];
              this.barChartLabelsInCome = [];
              this.barChartDataIncome = datos[0];

              this.barChartLabelsInCome = datos[2][0];

              break;

            case "2":
              this.barChartDataNProt = [];
              this.barChartLabelsNProt = [];

              this.barChartDataNProt = datos[0];
              this.barChartLabelsNProt = datos[2][0];

              break;

            case "3":
              this.barChartDataPend = [];
              this.barChartLabelsPend = [];

              this.barChartDataPend = datos[0];
              this.barChartLabelsPend = datos[2][0];

              break;

            case "4":
              this.barChartDataNPol = [];
              this.barChartLabelsNPol = [];

              this.barChartDataNPol = datos[0];
              this.barChartLabelsNPol = datos[2][0];

              break;

          }

        }
      );


  }

}
