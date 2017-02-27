import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-numusersanalytics',
  templateUrl: './numusersanalytics.component.html',
  styleUrls: ['./numusersanalytics.component.css']
})
export class NumusersanalyticsComponent implements OnInit {
  @Input() numUsers: any[] = [];

  view: any[] = [700, 400];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C']
  };

  constructor() { }

  ngOnInit() {
  }

}
