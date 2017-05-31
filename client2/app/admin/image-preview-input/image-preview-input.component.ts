import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'image-preview-input',
  templateUrl: './image-preview-input.component.html',
  styleUrls: ['./image-preview-input.component.css']
})
export class ImagePreviewInputComponent implements OnInit, OnChanges {

  @Input() item : object;
  @ViewChild("img") img : ElementRef;
  @ViewChild("input") input : ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes : SimpleChanges) {
    this.input.nativeElement.value = "";
  }

  setPreviewImage(event) {
    let url = URL.createObjectURL(this.input.nativeElement.files[0]);
    this.img.nativeElement.src = url;
  }

}
