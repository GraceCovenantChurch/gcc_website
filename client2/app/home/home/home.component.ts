import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

import { MainAnnouncement } from '../main-announcement';
import { SmallAnnouncement } from '../small-announcement';
import { MemoryVerse } from '../memory-verse';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService) { }

  mainAnnouncements: MainAnnouncement[];
  smallAnnouncements: SmallAnnouncement[];
  memoryVerse: MemoryVerse;

  ngOnInit() {
    this.homeService.getMainAnnouncements().subscribe(
      mainAnnouncements => this.mainAnnouncements = mainAnnouncements
    );

    this.homeService.getSmallAnnouncements().subscribe(
      smallAnnouncements => this.smallAnnouncements = smallAnnouncements
    )

    this.homeService.getMemoryVerse().subscribe(
      memoryVerse => {
        this.memoryVerse = memoryVerse[0];
        console.log(this.memoryVerse);
      }
    )
  }

}
