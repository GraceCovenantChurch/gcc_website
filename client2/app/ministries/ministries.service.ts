import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs';

import { Ministry } from './ministry';
@Injectable()
export class MinistriesService {

  constructor(private http: Http) { }

  getMinistries() : Observable<Ministry[]> {
    return this.http.get('/ministry').map( (response) => response.json() );
  }

}
