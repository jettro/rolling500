import { Component, OnInit } from '@angular/core';
import {RecommenderService} from "../services/recommender.service";
import {Recommendation} from "../services/recommendation";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [RecommenderService]
})
export class HomeComponent implements OnInit {
  user_id: string;
  recommendations: Array<Recommendation> = [];

  constructor(private recommenderService: RecommenderService) { }

  ngOnInit() {
    this.user_id = localStorage.getItem("user_id");

    if (this.user_id) {
      this.loadRecommendations();
    }
  }

  loadRecommendations(): void {
    this.recommenderService.loadRecommendations(this.user_id).subscribe(
      (data) => {
        data.forEach(recommendation => {
          console.log(recommendation);
          this.recommendations.push(recommendation)
        });
      },
      err => console.log("Cannot obtain recommendations", err.status, err.url),
      () => console.log('Done, size of data: ' + this.recommendations.length)
    );
  }


}
