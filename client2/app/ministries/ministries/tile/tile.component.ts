import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {
  @Input() name: string;
  @Input() pic: string;
  @Input() row: number;
  @Input() col: number;
  @Output() chosen = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  clicked() {
    //emit to parent component where the click happened
    this.chosen.emit({row: this.row, col: this.col});
  }
}
