import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../shared/services/common.service';
import {ReportService} from '../../shared/services/report.service';
import {UserService} from '../../shared/services/user.service';
import {PdfService} from "../../shared/services/pdf.service";
declare var jQuery:any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})

/**
 * Class representing Reports Component.
 */
export class ReportsComponent implements OnInit {
  public startDateModel: Date;
  public endDateModel: Date;
  public selectedReportType: string;
  public productSales: any;
  public brandSales: any;
  public loading: boolean;
  emptyTable: boolean = true;
  exportPdf: boolean;
  datepickerToOpts: any = { startDate: ''};

  constructor(private commonService: CommonService, private reportService: ReportService, private userService: UserService, private pdfService: PdfService) {
    this.selectedReportType = 'product-sales-report';
    this.loading = false;
    this.exportPdf = false;
  }

  ngOnInit() {
  }

  /**
   * Function to get the product or brand report data from the REST API.
   * @param value - details about the report to be generated.
   */
  public getReports(value): void {
    this.emptyTable = false;
    this.loading = true;
    this.endDateModel = value.endDate;

    let param = {
      marketPlaceId: this.userService.supplierID,
      startDate: value.startDate ? value.startDate.toISOString() : '',
      endDate: value.endDate ? value.endDate.toISOString() : ''
    };

    switch (value.reportType) {
      case 'brand-sales-report':
        this.reportService.getBrandSales(param)
          .subscribe((data: any) => {
            this.brandSales = data.data.brand_sales;
            this.loading = false;
            this.exportPdf = this.brandSales.length ? true : false;
          });
        break;
      case 'product-sales-report':
        this.reportService.getProductSales(param)
          .subscribe((data: any) => {
            this.productSales = data.data.product_sales;
            this.loading = false;
            this.exportPdf = this.productSales.length ? true : false;
          });
        break;
    }
  }

  /**
   * Function to export the reports in a pdf format using the pdf service.
   */
  public exportToPdf(): void {
    let colProducts = [
      {title: 'Brand ID', dataKey: 'brand_id'},
      {title: 'Brand Name', dataKey: 'brand_name'},
      {title: 'Quantity', dataKey: 'quantity'},
      {title: 'Total', dataKey: 'total'},
    ];

    let colBrands = [
      {title: 'Product ID', dataKey: 'product_id'},
      {title: 'Product Name', dataKey: 'product_name'},
      {title: 'Quantity', dataKey: 'quantity'},
      {title: 'Total', dataKey: 'total'},
    ];

    switch (this.selectedReportType) {
      case 'brand-sales-report':
        this.pdfService.generatePdf(colProducts, this.brandSales, this.startDateModel, this.endDateModel, 'Brand Sales');
        break;
      case 'product-sales-report':
        this.pdfService.generatePdf(colBrands, this.productSales, this.startDateModel, this.endDateModel, 'Product Sales');
        break;
    }
  }

  /**
   * Triggered when date and report type changes.
   */
  public onReportChange(): void {
    this.brandSales = null;
    this.productSales = null;
    this.exportPdf = false;
    this.emptyTable = true;
  }

  /**
   * Function to handle on change of the date from.
   * @param dateFrom - changed dataFrom.
   */
  public handleDateFromChange(dateFrom: Date): void {
    this.onReportChange();
    this.startDateModel = dateFrom;
    this.datepickerToOpts = {
      startDate: dateFrom
    };
    this.endDateModel = dateFrom;
  }

  /**
   * Function to handle on change of the data to.
   * @param dateTo - changed date to.
   */
  public handleDateToChange(dateTo: Date): void {
    this.onReportChange();
    this.endDateModel = dateTo;
  }
}
