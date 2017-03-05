import { Injectable } from '@angular/core';
import {Evidence, EmotionEvidence} from "./evidence";
import {Observable} from "rxjs";
import {Response, Headers, Http} from "@angular/http";
import {environment} from "../../environments/environment";

@Injectable()
export class EvidenceService {

  constructor(private http: Http) { }

  storeEvidence(evidence: Evidence): Observable<Response> {
    let url = `${environment.backend}api/evidence`;
    return this.doSendEvidence(url, evidence);  }

  storeEmotionEvidence(evidence: EmotionEvidence): Observable<Response> {
    let url = `${environment.backend}api/evidence/emotion`;
    return this.doSendEvidence(url, evidence);
  }

  private doSendEvidence(url: string, evidence: Evidence) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .post(url, JSON.stringify(evidence), {headers: headers});
  }

}
