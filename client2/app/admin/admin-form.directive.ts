import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[admin-form]'
})
export class AdminFormDirective {

  constructor(public vcr : ViewContainerRef) { }

}
