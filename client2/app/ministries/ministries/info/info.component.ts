import { Component, OnInit, Input, OnChanges, Inject, ElementRef } from '@angular/core';
import { PageScrollConfig, PageScrollService, PageScrollInstance, EasingLogic } from 'ng2-page-scroll';
import { DOCUMENT } from '@angular/platform-browser';

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

  myEasing : EasingLogic = {
    ease : (t: number, b: number, c: number, d: number): number => {
      t /= d;
      return -c * t*(t-2) + b;  
    }
  }

  constructor(private e : ElementRef,
              private psc : PageScrollService,
              @Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (!this.hideRow()) {
      let psi : PageScrollInstance = PageScrollInstance.newInstance(
        {document:this.document,
        scrollTarget: this.e.nativeElement,
        pageScrollDuration: 500,
        pageScrollOffset: 100,
        pageScrollEasingLogic : this.myEasing} );
      this.psc.start(psi);
    }
  }

  hideRow() : boolean {
    return this.row !== this.selectedRow;
  }

}
