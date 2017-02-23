import {Component, OnInit} from '@angular/core';
import {RatingService} from "../services/rating.service";
import {Rating} from "../services/rating";
import {AlbumService} from "../services/album.service";
import {Album} from "../services/album";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  providers: [RatingService, AlbumService]
})
export class RatingComponent implements OnInit {

  user_id: string;
  ratings: Rating;
  albums: Array<Album> = [];

  constructor(private ratingService: RatingService, private albumService: AlbumService) {
  }

  ngOnInit() {
    let user_id = localStorage.getItem("user_id");

    if (!user_id) {
      user_id = this.generateUUID();
      localStorage.setItem("user_id",user_id);
    }
    this.user_id = user_id;
    this.ratingService.obtainRating(this.user_id).subscribe(
      data => {
        this.ratings = data;
        this.loadAllAlbums();
      },
      err => console.log("Cannot obtain ratings", err.status, err.url),
      () => console.log('Done, size of data: ' + this.ratings.ratings.length)
    );
  }

  loadAllAlbums() {
    this.albumService.findAllAlbums().subscribe(
      (data) => {
        data.forEach(album => this.albums.push(album));
      },
      err => console.log("Cannot obtain albums", err.status, err.url),
      () => console.log('Done, size of data: ' + this.albums.length)
    );
  }

  chooseEmotion(emotion: number, album: number) {
    this.ratings.ratings[album-1]=emotion;

    this.ratingService.storeRating(this.ratings).subscribe(
      data => console.log("Response received"),
      err => console.log("Cannot store ratings", err.status, err.url),
      () => console.log('Ratings are stored')
    );
  }

  generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
}
