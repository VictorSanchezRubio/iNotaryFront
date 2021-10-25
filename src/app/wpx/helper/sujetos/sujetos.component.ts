import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core'; /*  ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, */
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fromEvent } from 'rxjs';
import { WpxServicesService } from 'src/app/services/wpx-services.service';




@Component({
  selector: 'app-sujetos',
  templateUrl: './sujetos.component.html',
  styleUrls: ['./sujetos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SujetosComponent implements AfterViewInit { /* , OnChanges OnInit,*/


  @Input() DNI: string;
  @Output() okSujeto = new EventEmitter<string>();
  @ViewChild('input') input: ElementRef<HTMLElement>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  _displayStanard: string[] = ["DNI", "NOMBRE", "PRIMERAPELLIDO", "SEGUNDOAPELLIDO"];
  _searchStandard = new MatTableDataSource([]);

  @ViewChild(MatSort, { static: false })
  set sortSujetos(sort: MatSort) {
    this._searchStandard.sort = sort;

  }



  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  _search: string = "";

  length = 0;
  pageSize = 10;
  totalCon = 0;


  constructor(public services: WpxServicesService) { }
  /*
    ngOnInit(): void {
  
     
    }
  
  */


  ngAfterViewInit() {

    this._searchStandard.sort = this.sortSujetos;
    this._searchStandard.paginator = this.paginator;

    console.log(this.sortSujetos);

    setTimeout(() => {
      this._search = this.DNI;
      this.loadInitial();
    });


    if (this.DNI != "") {
      setTimeout(() => {
        fromEvent(this.input.nativeElement, "keyup.enter")
          .subscribe(res => console.warn("ddd"));
      }, 1000);
    }


  }



  loadInitial(): void {

    let where = "";

    if (this.DNI != "") {

      let auxDNI;


      if (this.DNI.indexOf(" ")!==-1) {

        auxDNI = this.DNI.split(" ");

        // console.log(auxDNI);

        auxDNI.forEach((values: any, index: any) => {

          if (where != "") {
            where = where + " or ";
          }
          //    this._encargados.push({ value: values["CODIGOEMPLEADO"], viewValue: values["CODIGOEMPLEADO"] + ' - ' + values["NOMBREEMPLEADO"] });
          where = where + "(DNI like '%" + values + "%' or NOMBRE like '%" + values + "%' or PRIMERAPELLIDO like '%" + values + "%' or SEGUNDOAPELLIDO like '%" + values + "%')";

        });

      }



      if (this.DNI.indexOf("+") !== -1) {

        auxDNI = this.DNI.split("+");
        auxDNI.forEach((values: any, index: any) => {

          if (where != "") {
            where = where + " and ";
          }
          where = where + "(DNI like '%" + values + "%' or NOMBRE like '%" + values + "%' or PRIMERAPELLIDO like '%" + values + "%' or SEGUNDOAPELLIDO like '%" + values + "%')";
        });
      }

      // 

      if (where === "") {
        where = "DNI like '%" + this.DNI + "%' or NOMBRE like '%" + this.DNI + "%' or PRIMERAPELLIDO like '%" + this.DNI + "%' or SEGUNDOAPELLIDO like '%" + this.DNI + "%'";
      }


    }


    let tablas = ({
      'tabla': 'SUJETOS',
      'campo': '',
      'campossql': 'DNI,NOMBRE,PRIMERAPELLIDO,SEGUNDOAPELLIDO',
      'noSQL': '',
      'where': where,
      'order': 'DNI',
      'group': ''
    });

    this.services.getData(tablas).subscribe(data => {


      let datos = data.detail;

      this.totalCon = 0;


      this._searchStandard = new MatTableDataSource(datos);
      this._searchStandard.paginator = this.paginator;
      this._searchStandard.sort = this.sortSujetos;

      this.length = datos.length;

      this.totalCon = datos.length;
      /*
            if (this.DNI != "") {
      
              fromEvent(this.input.nativeElement, "keyup");
      
            }
      */
    }, error => {
      alert(error.status + " " + error.statusText);
      console.error(error.status + " " + error.statusText);
    });




  }
  /*
    ngOnChanges(changes: SimpleChanges) {
      console.log(changes);
  
      // this._searchStandard = new MatTableDataSource(changes.data.currentValue);
    }
  
  */
  confirmSubject(obj: string): void {

    this.okSujeto.emit(obj);

  }

  applyFilter(event: Event) {

    if (this.DNI === "") {
      this.loadInitial();
    }

    const filterValue = (event.target as HTMLInputElement).value;
    this._searchStandard.filter = filterValue.trim().toLowerCase();

    if (this._searchStandard.paginator) {
      this._searchStandard.paginator.firstPage();
    }
  }



  /*
  
    sortData(sort: Sort) {
      const data = this._searchStandard;
      if (!sort.active || sort.direction == '') {
        this._searchStandard = data;
        return;
      }
  
      this._searchStandard = data.sort((a, b) => {
        let isAsc = sort.direction == 'asc';
        switch (sort.active) {
          case 'name': return compare(a.name, b.name, isAsc);
          case 'calories': return compare(+a.calories, +b.calories, isAsc);
          case 'fat': return compare(+a.fat, +b.fat, isAsc);
          case 'carbs': return compare(+a.carbs, +b.carbs, isAsc);
          case 'protein': return compare(+a.protein, +b.protein, isAsc);
          default: return 0;
        }
      });
    }
  
  */





}

/*
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
*/
