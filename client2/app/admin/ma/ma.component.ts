import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ma',
  templateUrl: './ma.component.html',
  styleUrls: ['./ma.component.css']
})
export class MaComponent implements OnInit {

  @Input() activeItem: object;
  @Input() route: string;
  constructor() { }

  ngOnInit() {
    this.activeItem = {title: "", description: "", pic : {url: ""}};
  }

  onSubmit() {
    console.log(this.activeItem["_id"]);
    console.log(this.activeItem["pic"]);
  }
}
