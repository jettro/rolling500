import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../services/dashboard.service";
import {Dashboard} from "../services/Dashboard";
import {KeyValuePair} from "../services/KeyValuePair";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboard: Dashboard;

  // single: any[];

  single: any[] =
   [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    }
  ];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Rating';
  showYAxisLabel = true;
  yAxisLabel = 'Overall count';

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#A10A28']
  };

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.loadData();
  }


  onSelect(event) {
    console.log(event);
  }

  loadData(): void {
    this.dashboardService.obtainDashboard().subscribe(
      (data) => {
        this.single = [];
        data.ratings.forEach(ratingValue => {
          const item = {name: ratingValue.key, value: ratingValue.value};
          this.single = [...this.single, item];
        });
        console.log(JSON.stringify(this.single));
      },
      err => console.log("Cannot obtain albums", err.status, err.url),
      () => console.log('Done')
    );
  }

}
