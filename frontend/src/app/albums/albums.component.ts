import {Component, OnInit} from '@angular/core';
import {AlbumService} from "../services/album.service";
import {Album} from "../services/album";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
  providers: [AlbumService]
})
export class AlbumsComponent implements OnInit {
  backend: string = "/";
  albums: Array<Album> = [];

  page: number = 1;

  constructor(private albumService: AlbumService) {
  }

  ngOnInit() {
    this.backend = environment.backend;
    this.loadAlbums();
  }

  reloadAlbums(): void {
    this.page = 1;
    this.loadAlbums()
  }

  loadAlbums(): void {
    this.albumService.findAlbums(this.page).subscribe(
      (data) => {
        data.forEach(album => this.albums.push(album));
      },
      err => console.log("Cannot obtain albums", err.status, err.url),
      () => console.log('Done, size of data: ' + this.albums.length)
    );
  }


  onScrollDown(): void {
    console.log('scrolled down!!')
    this.page += 1;
    this.loadAlbums();
  }
}
