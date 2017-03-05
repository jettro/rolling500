import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {Rating} from "./rating";
import {environment} from "../../environments/environment";

@Injectable()
export class RatingService {

  constructor(private http: Http) { }

  obtainRating(user_id: string): Observable<Rating> {
    return this.http
      .get(`${environment.backend}api/rating/${user_id}`)
      .map((r: Response) => r.json() as Rating);
  }

  storeRating(rating: Rating): Observable<Response> {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(`${environment.backend}api/rating`, JSON.stringify(rating), {headers: headers});
      // .map((r: Response) => r.json());
  }
}
