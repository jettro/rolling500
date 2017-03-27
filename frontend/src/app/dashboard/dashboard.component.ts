import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../services/dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ratingsData: any[] = [];
  evidencesData: any[] = [];
  numUsers: any[] = [];

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    this.dashboardService.obtainDashboard().subscribe(
      (data) => {
        // counters
        // this.numUsers = [{"name": "Number of users", "value": 7}];
        console.log(data.numUsers);

        this.numUsers = [{"name": "Number of users", "value": data.numUsers}];

        // ratings
        this.ratingsData = [];
        data.ratings.forEach(ratingValue => {
          const item = {name: ratingValue.key, value: ratingValue.value};
          this.ratingsData = [...this.ratingsData, item];
        });

        // evidences
        this.evidencesData = [];
        data.evidences.forEach(evidenceValue => {
          const item = {name: evidenceValue.key, value: evidenceValue.value};
          this.evidencesData = [...this.evidencesData, item];
        });
      },
      err => console.log("Cannot obtain albums", err.status, err.url)
    );
  }

}
