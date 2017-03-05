import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Album} from "./album";
import {environment} from "../../environments/environment";

@Injectable()
export class AlbumService {

  constructor(private http: Http) {
  }

  findAlbums(page: number): Observable<Array<Album>> {
    return this.http
      .get(`${environment.backend}api/albums?page=${page}`)
      .map((r: Response) => r.json() as Array<Album>);
  }

  findAllAlbums(): Observable<Array<Album>> {
    return this.http
      .get(`${environment.backend}api/albums/all`)
      .map((r: Response) => r.json() as Array<Album>);
  }

  loadAlbum(id: number): Observable<Album> {
    return this.http
      .get(`${environment.backend}api/albums/${id}`)
      .map((r: Response) => r.json() as Album);
  }

}
