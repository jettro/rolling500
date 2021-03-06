import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {RatingService} from "../services/rating.service";
import {Rating} from "../services/rating";
import {AlbumService} from "../services/album.service";
import {Album} from "../services/album";
import {MdDialog, MdDialogRef, MdDialogConfig} from "@angular/material";
import {DialogAlbumDetailComponent} from "./dialog-albumdetail.component";
import {WindowRefService} from "../services/windowref.service";
import {EvidenceService} from "../services/evidence.service";
import {Evidence, EmotionEvidence} from "../services/evidence";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  providers: [RatingService, AlbumService, WindowRefService, EvidenceService]
})
export class RatingComponent implements OnInit {

  user_id: string;
  ratings: Rating;
  albums: Array<Album> = [];
  dialogRef: MdDialogRef<DialogAlbumDetailComponent>;
  backend: string = "/";

  constructor(private ratingService: RatingService,
              private albumService: AlbumService,
              private evidenceService: EvidenceService,
              private windowRefService: WindowRefService,
              public dialog: MdDialog,
              public viewContainerRef: ViewContainerRef
              ) {
  }

  ngOnInit() {
    let user_id = localStorage.getItem("user_id");

    if (!user_id) {
      user_id = this.generateUUID();
      localStorage.setItem("user_id", user_id);
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
    this.backend = environment.backend;
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
    this.ratings.ratings[album - 1] = emotion;

    this.ratingService.storeRating(this.ratings).subscribe(
      data => console.log("Response received"),
      err => console.log("Cannot store ratings", err.status, err.url),
      () => console.log('Ratings are stored')
    );

    let evidence = new EmotionEvidence();
    evidence.album_id = album;
    evidence.evidence_name = "emotion_chosen";
    evidence.user_id = this.user_id;
    evidence.emation = emotion;
    this.evidenceService.storeEmotionEvidence(evidence).subscribe(
      data => {},
      err => console.log("Cannot send emotion evidence", err.status, err.url)
    );
  }

  showAlbumDetails(album: Album) {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;
    config.width="600px";
    config.height="400px";

    this.albumService.loadAlbum(album.id).subscribe(
      (data) => {
        this.dialogRef = this.dialog.open(DialogAlbumDetailComponent, config);
        this.dialogRef.componentInstance.album = data;

        this.dialogRef.afterClosed().subscribe(result => {
          this.dialogRef = null;
        });
      },
      err => console.log("Cannot obtain album with id ", err.status, err.url)
    );

    let evidence = new Evidence();
    evidence.album_id = album.id;
    evidence.evidence_name = "album_details_requested";
    evidence.user_id = this.user_id;
    this.evidenceService.storeEvidence(evidence).subscribe(
      data => {},
      err => console.log("Cannot send detail evidence", err.status, err.url)
    );

  }

  openYoutubeSearch(album: Album) {
    let url = `https://www.youtube.com/results?search_query=${album.album + " " + album.artist}`;

    let evidence = new Evidence();
    evidence.album_id = album.id;
    evidence.evidence_name = "youtube_requested";
    evidence.user_id = this.user_id;
    this.evidenceService.storeEvidence(evidence).subscribe(
      data => {},
      err => console.log("Cannot send youtube evidence", err.status, err.url)
    );

    this.windowRefService.getNativeWindow().open(url)
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
