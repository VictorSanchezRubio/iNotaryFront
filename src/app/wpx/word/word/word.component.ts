import { Component, OnInit } from '@angular/core';
import { TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {

  tinyMceConfig: any;
  filter: any[] = [];


  constructor() { }

  ngOnInit(): void {




  }

  
}
