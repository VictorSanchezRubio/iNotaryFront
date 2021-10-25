import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { ShareServiceService } from 'src/app/services/share-service.service';


@Component({
  selector: 'app-clases-compareciencia',
  templateUrl: './clases-compareciencia.component.html',
  styleUrls: ['./clases-compareciencia.component.scss']
})
export class ClasesComparecienciaComponent implements OnInit {

  @Input() item: any;

comparecientesClase1=[""];
comparecientesClase2=[""];
comparecientesClase3=[""];
comparecientesClase4=[""];

  constructor(private ss: ShareServiceService) { }

  ngOnInit(): void {
  }


  onDrop(event: CdkDragDrop<string[]>) {
this.ss.drop(event);

console.log(event.container.data);


  }

}
