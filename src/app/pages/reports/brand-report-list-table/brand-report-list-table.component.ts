import {Component, OnInit} from '@angular/core';
import {Input} from '@angular/core/src/metadata/directives';

@Component({
  selector: 'app-brand-report-list-table',
  templateUrl: './brand-report-list-table.component.html',
  styleUrls: ['./brand-report-list-table.component.scss']
})
export class BrandReportListTableComponent implements OnInit {
  @Input() brandSales: Array<any>;

  constructor() {
  }

  ngOnInit() {
  }

}
