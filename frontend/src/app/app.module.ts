import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  MaterialModule, MdCardModule, MdToolbarModule, MdSidenavModule, MdIconModule,
  MdButtonModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums.component';
import { AboutComponent } from './about/about.component';
import {routing} from "./app.routing";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import 'hammerjs';
import {AlbumService} from "./services/album.service";
import {InfiniteScrollModule} from "angular2-infinite-scroll";
import { RatingComponent } from './rating/rating.component';
import {RatingService} from "./services/rating.service";

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    AboutComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    routing,
    MdCardModule,
    MdToolbarModule,
    MdSidenavModule,
    MdIconModule,
    MdButtonModule,
    InfiniteScrollModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, AlbumService, RatingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
