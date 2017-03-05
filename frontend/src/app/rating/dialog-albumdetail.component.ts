import {Component} from "@angular/core";
import {MdDialogRef} from "@angular/material";
import {Album} from "../services/album";

@Component({
  selector: 'dialogalbumdetailcomponent',
  templateUrl: './rating-dialog-detail.component.html'
})
export class DialogAlbumDetailComponent {
  album: Album;

  constructor(public dialogRef: MdDialogRef<DialogAlbumDetailComponent>) {}
}
