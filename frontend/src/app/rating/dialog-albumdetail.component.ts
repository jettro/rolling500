import {Component, OnInit} from "@angular/core";
import {MdDialogRef} from "@angular/material";
import {Album} from "../services/album";
import {environment} from "../../environments/environment";

@Component({
  selector: 'dialogalbumdetailcomponent',
  templateUrl: './rating-dialog-detail.component.html'
})
export class DialogAlbumDetailComponent implements OnInit {
  album: Album;
  backend: string = "/";
  constructor(public dialogRef: MdDialogRef<DialogAlbumDetailComponent>) {}

  ngOnInit(): void {
    this.backend = environment.backend;
  }
}
