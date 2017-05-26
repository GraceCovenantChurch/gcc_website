import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'image-preview-input',
  templateUrl: './image-preview-input.component.html',
  styleUrls: ['./image-preview-input.component.css']
})
export class ImagePreviewInputComponent implements OnInit {

  @Input() item : object;

  constructor() { }
  
  ngOnInit() {

  }


}
