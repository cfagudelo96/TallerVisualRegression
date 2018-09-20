import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

import { Report } from '../models/report';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  reports: Report[];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.getReports();
  }

  generateReport() {
    this.appService.generateReport();
  }

  private getReports() {
    this.appService.getReports().subscribe(reports => this.reports = reports);
  }
}
