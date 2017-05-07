import { Component, OnInit } from '@angular/core';
import {SearchService} from "../services/search.service";
import {SearchResponse} from "../services/SearchResponse";
import {environment} from "../../environments/environment";
import {SearchRequest} from "../services/SearchRequest";
import {FilterRequest} from "../services/FilterRequest";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {
  backend: string = "/";
  searchResponse: SearchResponse = new SearchResponse();

  page: number = 1;
  searchString: string;
  artistFilter: string;
  labelFilter: string;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.backend = environment.backend;
  }

  searchAlbums(searchString: string): void {
    this.searchString = searchString;
    this.artistFilter = null;
    this.labelFilter = null;
    this.resetSearch();
  }

  private resetSearch() {
    this.searchResponse.foundAlbums = [];
    this.page = 1;
    this.doSearchAlbums();
  }

  addArtistFilter(artist: string): void {
    this.artistFilter = artist;
    this.resetSearch();
  }

  removeArtistFilter(): void {
    this.artistFilter = null;
    this.resetSearch();
  }

  addLabelFilter(label: string): void {
    this.labelFilter = label;
    this.resetSearch();
  }

  removeLabelFilter(): void {
    this.labelFilter = null;
    this.resetSearch();
  }

  doSearchAlbums(): void {
    let request: SearchRequest = new SearchRequest();
    request.page = this.page;
    request.size = 10;
    request.searchString = this.searchString;
    request.filters = [];

    if (this.labelFilter != null) {
      let filter = new FilterRequest();
      filter.field = "label";
      filter.value = this.labelFilter;
      request.filters.push(filter);
    }

    if (this.artistFilter != null) {
      let filter = new FilterRequest();
      filter.field = "artist";
      filter.value = this.artistFilter;
      request.filters.push(filter);
    }

    this.searchService.searchAlbums(request).subscribe(
      (data) => {
        data.foundAlbums.forEach(album => this.searchResponse.foundAlbums.push(album));
        this.searchResponse.totalNumberOfResults = data.totalNumberOfResults;
        this.searchResponse.artists = data.artists;
        this.searchResponse.labels = data.labels;
      },
      err => console.log("Cannot search albums", err.status, err.url),
      () => console.log('Done, nr of found albums: ' + this.searchResponse.foundAlbums.length)
    );
  }

  onScrollDown(): void {
    this.page += 1;
    this.doSearchAlbums();
  }

}
