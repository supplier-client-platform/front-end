import { Component, OnInit } from '@angular/core';
import {Input} from '@angular/core/src/metadata/directives';

@Component({
  selector: 'app-product-report-list-table',
  templateUrl: './product-report-list-table.component.html',
  styleUrls: ['./product-report-list-table.component.scss']
})
export class ProductReportListTableComponent implements OnInit {
  @Input() productSales: Array<any>;

  constructor() { }

  ngOnInit() {
  }

}
