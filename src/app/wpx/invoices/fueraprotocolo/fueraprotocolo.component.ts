import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fueraprotocolo',
  templateUrl: './fueraprotocolo.component.html',
  styleUrls: ['./fueraprotocolo.component.scss']
})
export class FueraprotocoloComponent implements OnInit {

  constructor() { }

  time: any= 1000

  ngOnInit(): void {
    this.time = this.time+1000;
  }




}
