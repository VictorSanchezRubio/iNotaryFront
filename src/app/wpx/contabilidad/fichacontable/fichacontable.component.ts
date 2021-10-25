import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fichacontable',
  templateUrl: './fichacontable.component.html',
  styleUrls: ['./fichacontable.component.scss']
})
export class FichacontableComponent implements OnInit {

  @Input() protocolo: any;


  constructor() { }

  ngOnInit(): void {
  }

}
