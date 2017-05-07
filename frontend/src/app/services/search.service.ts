import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";
import {Http, Response} from "@angular/http";
import {SearchRequest} from "./SearchRequest";
import {SearchResponse} from "./SearchResponse";

@Injectable()
export class SearchService {

  constructor(private http: Http) {
  }

  searchAlbums(searchRequest: SearchRequest): Observable<SearchResponse> {
    return this.http
      .post(`${environment.backend}api/albums/search`, searchRequest)
      .map((r: Response) => r.json() as SearchResponse);
  }

}
