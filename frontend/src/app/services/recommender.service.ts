import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Recommendation} from "./recommendation";
import {environment} from "../../environments/environment";

@Injectable()
export class RecommenderService {

  constructor(private http: Http) { }

  loadRecommendations(user_id: string): Observable<Array<Recommendation>> {
    return this.http
      .get(`${environment.backend}api/recommender/user/${user_id}`)
      .map((r: Response) => r.json() as Array<Recommendation>);
  }
}
