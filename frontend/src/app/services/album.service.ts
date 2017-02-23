import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Album} from "./album";

@Injectable()
export class AlbumService {

  constructor(private http: Http) {
  }

  findAllAlbums(page: number): Observable<Array<Album>> {
    console.log(page);
    return this.http
      .get(`http://localhost:8080/api/albums?page=${page}`)
      .map((r: Response) => r.json() as Array<Album>);
  }

}
