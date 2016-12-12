import { Component, OnInit } from '@angular/core';
import {CommonService} from "../../shared/services/common.service";
import {ReportService} from "../../shared/services/report.service";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  public startDate: string;
  public endDate: string;
  public selectedReportType: string;
  public productSales: any;
  public brandSales: any;
  public loading: boolean;

  constructor(private commonService: CommonService, private reportService: ReportService) {
    this.selectedReportType = "product-sales-report";
    this.loading = false;
  }

  ngOnInit() {
  }

  getReports(value) {
    this.loading = true;

    let param = {
      marketPlaceId: 1,
      startDate: value.startDate ? value.startDate.toISOString() : "",
      endDate: value.endDate ? value.endDate.toISOString() : ""
    };

    switch (value.reportType) {
      case 'brand-sales-report':
        this.reportService.getBrandSales(param)
          .subscribe((data: any) => {
            this.brandSales = data.data.brand_sales;
            this.loading = false;
            console.log(data);
          });
        break;
      case 'product-sales-report':
        this.reportService.getProductSales(param)
          .subscribe((data: any) => {
            this.productSales = data.data.product_sales;
            this.loading = false
            console.log(data);
          });
        break;
    }
  }
}
