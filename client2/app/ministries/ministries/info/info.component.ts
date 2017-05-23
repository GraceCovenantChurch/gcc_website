import { Component, OnInit, Input, OnChanges, ElementRef } from '@angular/core';

import { Ministry } from '../../ministry';

@Component({
  selector: 'info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit, OnChanges {
  @Input() ministry: Ministry;
  @Input() selectedRow : number;
  @Input() row : number;

  constructor(private elementRef : ElementRef) { }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  hideRow() : boolean {
    return this.row !== this.selectedRow;
  }

}
