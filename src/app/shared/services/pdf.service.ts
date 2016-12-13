import { Injectable } from '@angular/core';
import {UserService} from "./user.service";
import 'jspdf';
import {IMG_BASE64_CONST} from "../config/img.base64.constants";
declare let jsPDF: any;
declare let moment: any;

@Injectable()
export class PdfService {
  public jsPdfDoc: any;
  public businessDetails: any;

  constructor(private userService: UserService) {
    this.userService.getBussinessDetails().subscribe((data: any) => {
      this.businessDetails = data.data[0];
    });
  }

  generatePdf(columns: Array<any>, rows: Array<any>, startDate: string, endDate: string, type: string) {
    this.jsPdfDoc = new jsPDF('p', 'pt', 'a4');
    this.jsPdfDoc.autoTable(columns, rows, {
      addPageContent: (data) => {

        let logo = IMG_BASE64_CONST.IMG_SC_LOGO;

        // business image
        this.jsPdfDoc.addImage(this.businessDetails.image, 'PNG', data.settings.margin.left, 30, 100, 100);

        // business name
        this.jsPdfDoc.setFontSize(20);
        this.jsPdfDoc.setTextColor(117, 117, 117);
        this.jsPdfDoc.setFontStyle('normal');
        this.jsPdfDoc.setFont("courier", "Bold");
        this.jsPdfDoc.text(data.settings.margin.left+ 110, 70, this.businessDetails.name);

        // business address
        this.jsPdfDoc.setFontSize(10);
        this.jsPdfDoc.setTextColor(189, 189, 189);
        this.jsPdfDoc.setFontStyle('normal');
        this.jsPdfDoc.setFont("courier");
        this.jsPdfDoc.text(data.settings.margin.left+ 110, 90, JSON.parse(this.businessDetails.address).address);

        // footer
        this.jsPdfDoc.line(0, this.jsPdfDoc.internal.pageSize.height - 60, this.jsPdfDoc.internal.pageSize.width, this.jsPdfDoc.internal.pageSize.height - 60);

        let xOffset = (this.jsPdfDoc.internal.pageSize.width / 2) - (140/ 2);

        this.jsPdfDoc.addImage(logo, 'JPEG', data.settings.margin.left+ 200 , this.jsPdfDoc.internal.pageSize.height - 60, 140, 50);

        this.jsPdfDoc.line(0, this.jsPdfDoc.internal.pageSize.height - 10, this.jsPdfDoc.internal.pageSize.width, this.jsPdfDoc.internal.pageSize.height - 10);

        // Report details
        this.jsPdfDoc.setFontSize(15);
        this.jsPdfDoc.setTextColor(117, 117, 117);
        this.jsPdfDoc.setFontStyle('normal');
        this.jsPdfDoc.setFont("courier", "Bold");
        this.jsPdfDoc.text(data.settings.margin.left, 160, 'Report Type : ');
        this.jsPdfDoc.setFont("courier");
        this.jsPdfDoc.text(data.settings.margin.left+100, 160, type);
        this.jsPdfDoc.setFont("courier", "Bold");
        this.jsPdfDoc.text(data.settings.margin.left, 180, 'Period : ');
        this.jsPdfDoc.setFont("courier");

        this.jsPdfDoc.text(data.settings.margin.left+100, 180, moment(startDate).format("MMM Do YY") + ' to '+ moment(endDate).format("MMM Do YY"));
      },
      margin: {top: 200},
      createdCell: function (cell, data) {
        if (data.column.dataKey === 'total') {
          cell.text = 'Rs. ' + parseFloat(cell.text).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        }
      },
      styles: {
        fontStyle: 'normal',
        font: "courier",
      }
    });
    moment().format('MM');
    this.jsPdfDoc.save(type + moment(startDate).format('MMM') + 'to'+ moment(endDate).format('MMM')+'.pdf');
  }
}
