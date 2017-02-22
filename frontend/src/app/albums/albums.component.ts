import {Component, OnInit} from '@angular/core';
import {AlbumService} from "../services/album.service";
import {Album} from "../services/album";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
  providers: [AlbumService]
})
export class AlbumsComponent implements OnInit {

  albums: Album[];

  constructor(private albumService: AlbumService) {
  }

  ngOnInit() {
    this.loadAlbums();
  }

  loadAlbums(): void {
    this.albumService.findAllAlbums().subscribe(
      data => this.albums = data,
      err => console.log("Cannot obtain albums", err.status, err.url),
      () => console.log('Done')
    );
  }

}
