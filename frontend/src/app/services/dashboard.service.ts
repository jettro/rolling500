import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Dashboard} from "./Dashboard";
import {environment} from "../../environments/environment";

@Injectable()
export class DashboardService {

  constructor(private http: Http) { }


  obtainDashboard(): Observable<Dashboard> {
    return this.http
      .get(`${environment.backend}api/dashboard`)
      .map((r: Response) => r.json() as Dashboard);
  }

}
