import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MinistriesService } from '../ministries.service';

import { Ministry } from '../ministry';
import { TileComponent } from './tile/tile.component';
import { InfoComponent } from './info/info.component';

@Component({
  selector: 'ministries',
  templateUrl: './ministries.component.html',
  styleUrls: ['./ministries.component.css']
})
export class MinistriesComponent implements OnInit {

  constructor(private ministriesService: MinistriesService) { }

  ministryList : Ministry[];
  selectedMinistry : Ministry;
  selectedRow : number = -1;
  numRowArray : number[];
  private numCol : number = 4;

  ngOnInit() {
    //get the ministries from the service, also set the numRows in the callback
    this.ministriesService.getMinistries().subscribe(
      (ministryList) => {
        this.ministryList = ministryList;
        //ngFor requires an iterable, so we make an array with the row nums
        let numRows = Math.ceil(ministryList.length / this.numCol);
        this.numRowArray = Array(numRows).fill(0).map( (value, index) => index);
      }
    );
  }

  getRowArray(rowNum : number) : Ministry[] {
    //set the start and end for the slicing
    let start = rowNum * this.numCol;
    let end = start + this.numCol;

    //slice the array to where we want it (inclusive, exclusive)
    return this.ministryList.slice(start, end);
  }

  openDescription(location) {
    //extract row/col from event payload
    let row = location.row;
    let col = location.col;

    //find the ministry we want from the list
    let index = row * this.numCol + col;

    this.selectedMinistry = this.ministryList[index];
    this.selectedRow=row;
    
  }
}
