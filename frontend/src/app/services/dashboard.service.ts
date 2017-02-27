import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Dashboard} from "./Dashboard";

@Injectable()
export class DashboardService {

  constructor(private http: Http) { }


  obtainDashboard(): Observable<Dashboard> {
    return this.http
      .get(`http://localhost:8080/api/dashboard`)
      .map((r: Response) => r.json() as Dashboard);
  }

}
