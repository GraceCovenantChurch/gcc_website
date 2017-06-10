import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs';

import { MainAnnouncement } from './main-announcement'
import { SmallAnnouncement } from './small-announcement'
import { MemoryVerse } from './memory-verse'

@Injectable()
export class HomeService {

  constructor(private http: Http) { }

  getMainAnnouncements(): Observable<MainAnnouncement[]> {
    return this.http.get('/mainAnnouncement').map( (response) => <MainAnnouncement[]> response.json());
  }

  getSmallAnnouncements(): Observable<SmallAnnouncement[]> {
    return this.http.get('/smallAnnouncement').map( (response) => <SmallAnnouncement[]> response.json());
  }

  getMemoryVerse(): Observable<MemoryVerse[]> {
    return this.http.get('/memoryVerse').map( (response) => <MemoryVerse[]> response.json());
  }

}
