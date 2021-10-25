import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface delConceptoInterface {
  id:string;
  text:string;
}


export interface DialogDataNew {
  text: string;
  textOld: string;
  error: string;

}

@Component({
  selector: 'app-tree-procedure',
  templateUrl: './tree-procedure.component.html',
  styleUrls: ['./tree-procedure.component.scss']
})
export class TreeProcedureComponent implements OnInit {

  @Input() conceptos: any;

  @Output() treeConcepto = new EventEmitter<string>();
  @Output() deleteConcepto = new EventEmitter<string>();



  myExpansion = [1];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }


  treeSelectedConcept(event, conceptSelected) {

    this.treeConcepto.emit(conceptSelected.id);

  }


  deleteSelectedConcept(event, conceptSelected): void {

    const dialogRef = this.dialog.open(DelConcepto, 
      {
        width: '250px',
        data: {text: 'Borrar Concepto.', id: conceptSelected.id }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
        this.deleteConcepto.emit(conceptSelected.id);   
      }
      });

  }

  openCahngeLabel(event, auxSelect): void {

// console.log(auxSelect);


    const dialogoRef = this.dialog.open(ChangeLabelDialogConcepto, {
      width: '325px',
      height: '300px',
      data: {
        text: auxSelect.descripcion,
        textOld: auxSelect.descripcion
      }
    });

    dialogoRef.afterClosed().subscribe(result => {

      if (result !== undefined) {

        if (result.text != "") {
          auxSelect.descripcion = result.text;
        }
      }
    })

  }

}


@Component({
  selector: "delete-concepto",
  templateUrl: 'dialogs/delete-concepto.html',
  styleUrls: ['./dialogs/delete-concepto.scss']

})
export class DelConcepto {

  constructor(
    public dialogRef: MatDialogRef<DelConcepto>,
    @Inject(MAT_DIALOG_DATA) public data: delConceptoInterface
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }



};



@Component({
  selector: "change-label-dialog-concepto",
  templateUrl: 'dialogs/change-label.html',
  styleUrls: ['./dialogs/change-label.scss']

})
export class ChangeLabelDialogConcepto {

  constructor(
    public dialogRef: MatDialogRef<ChangeLabelDialogConcepto>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataNew
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

};
