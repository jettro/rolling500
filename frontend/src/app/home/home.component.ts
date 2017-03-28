import { Component, OnInit } from '@angular/core';
import {RecommenderService} from "../services/recommender.service";
import {Recommendation} from "../services/recommendation";
import {environment} from "../../environments/environment";
import {EvidenceService} from "../services/evidence.service";
import {Evidence} from "../services/evidence";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [RecommenderService, EvidenceService]
})
export class HomeComponent implements OnInit {
  backend: string = "/";
  user_id: string;
  recommendations: Array<Recommendation> = [];

  constructor(private recommenderService: RecommenderService,
    private evidenceService: EvidenceService) { }

  ngOnInit() {
    this.backend = environment.backend;
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

    let evidence = new Evidence();
    evidence.evidence_name = "recommendations_received";
    evidence.user_id = this.user_id;
    this.evidenceService.storeEvidence(evidence).subscribe(
      data => {},
      err => console.log("Cannot send detail evidence", err.status, err.url)
    );

  }


}
