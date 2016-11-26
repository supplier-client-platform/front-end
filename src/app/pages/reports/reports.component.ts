import { Component, OnInit } from '@angular/core';
import {CommonService} from "../../shared/services/common.service";
import {ReportService} from "../../shared/services/report.service";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  public dateFrom;
  public dateTo;

  constructor(private commonService: CommonService, private reportService: ReportService) { }

  ngOnInit() {
  }

  getReports(value) {

    let param = {
      marketPlaceId: 1,
      startDate: value.startDate ? value.startDate.toISOString() : "",
      endDate: value.endDate ? value.endDate.toISOString() : ""
    };
    this.reportService.getBrandSales(param)
      .subscribe((data: any) => {
        console.log(data);
      });
  }

}
