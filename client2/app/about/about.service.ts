import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs';

import { Belief } from './belief';

@Injectable()
export class AboutService {

  constructor(private http: Http) {}

  getBeliefs() : Observable<Belief[]> {
    return this.http.get('/belief')
      .map( (response) => <Belief[]> response.json());
  }

}
