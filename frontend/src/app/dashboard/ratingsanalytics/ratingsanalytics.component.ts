import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-ratingsanalytics',
  templateUrl: './ratingsanalytics.component.html',
  styleUrls: ['./ratingsanalytics.component.css']
})
export class RatingsanalyticsComponent implements OnInit {
  @Input() ratingsData: any[] = [];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Rating';
  showYAxisLabel = true;
  yAxisLabel = 'Overall count';

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#A10A28']
  };

  constructor() { }

  ngOnInit() {

  }
}
