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
    this.appService.generateReport().subscribe(report => this.reports.unshift(report));
  }

  private getReports() {
    this.appService.getReports().subscribe(reports => {
      this.reports = reports;
    });
  }

  arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}
