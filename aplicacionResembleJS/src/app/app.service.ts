import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private url = `${environment.apiUrl}/reports`;

  constructor(private http: HttpClient) { }

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.url);
  }

  generateReport(): Observable<Report> {
    return this.http.post<Report>(this.url, null);
  }
}
