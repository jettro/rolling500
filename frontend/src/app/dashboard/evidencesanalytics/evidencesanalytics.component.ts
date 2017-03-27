import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-evidencesanalytics',
  templateUrl: './evidencesanalytics.component.html',
  styleUrls: ['./evidencesanalytics.component.css']
})
export class EvidencesanalyticsComponent implements OnInit {
  @Input() evidencesData: any[] = [];

  view: any[] = [700, 400];
  showLegend = true;

  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#A10A28']
  };


  constructor() { }

  ngOnInit() {
  }

}
