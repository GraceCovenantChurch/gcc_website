import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'image-preview-input',
  templateUrl: './image-preview-input.component.html',
  styleUrls: ['./image-preview-input.component.css']
})
export class ImagePreviewInputComponent implements OnInit, OnChanges {

  @Input() item : object;
  imgName : string;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes : SimpleChanges) {
  }

}
