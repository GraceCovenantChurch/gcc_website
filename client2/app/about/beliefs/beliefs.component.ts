import { Component, OnInit } from '@angular/core';
import { AboutService } from '../about.service';
import { Belief } from '../belief';

@Component({
  selector: 'beliefs',
  templateUrl: './beliefs.component.html',
  styleUrls: ['./beliefs.component.css']
})
export class BeliefsComponent implements OnInit {

  constructor(private aboutService : AboutService) { }

  current: Number = -1;
  beliefs: Belief[];

  ngOnInit() {
    this.aboutService.getBeliefs()
      .subscribe( beliefs => this.beliefs = beliefs);
  }

  selectBelief = function(number) {
    if (this.current === number) this.current = -1;
    else this.current = number;
  }

}
