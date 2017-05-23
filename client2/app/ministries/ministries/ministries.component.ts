import { Component, OnInit } from '@angular/core';
import { MinistriesService } from '../ministries.service';

import { Ministry } from '../ministry';
@Component({
  selector: 'ministries',
  templateUrl: './ministries.component.html',
  styleUrls: ['./ministries.component.css']
})
export class MinistriesComponent implements OnInit {

  constructor(private ministriesService: MinistriesService) { }

  ministryList : Ministry[];
  numRows : Number;

  ngOnInit() {
    this.ministriesService.getMinistries().subscribe(
      (ministryList) => {
        this.ministryList = ministryList;
        this.numRows = ministryList.length / 4;
      }
    );


  }

}
