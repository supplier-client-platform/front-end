import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../shared/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  stats: Object = {};
  ordersLoading: boolean = true;
  salesLoading: boolean = true;
  ordersTotal: number;
  salesTotal: number;
  public ordersData: Array<any> = [];
  public ordersDataLabel: Array<any> = [];

  public salesData: Array<any> = [];
  public salesDataLabel: Array<any> = [];

  public lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }



  constructor(public dashboardService: DashboardService) {
    this.getSales();
    this.getOrders();
    this.getStats();
  }

  ngOnInit() {
  }


  getStats() {
    this.dashboardService.getStats()
      .subscribe((data) => {

        this.stats = data.data;

        for (let key in this.stats) {
          if (this.stats.hasOwnProperty(key)) {
            this.stats[key] = (this.stats[key] === null || this.stats[key] === undefined) ? 0 : this.stats[key];
          }
        }
      }, (err) => {
        console.log(err);
      });
  }

  getOrders() {
    this.dashboardService.getOrders()
      .subscribe((data) => {


        let completed = { data: [], label: 'Completed' };
        let rejected = { data: [], label: 'Cancelled' };
        let months = [];
        let total = 0;

        for (let item of data.data.completed) {
          completed.data.push(parseFloat(item.orders));
          total += parseFloat(item.orders);
          months.push(item.month_name);
        }

        for (let item of data.data.rejected) {
          rejected.data.push(parseFloat(item.orders));
        }
        this.ordersTotal = total;
        this.ordersDataLabel = months.reverse();
        completed.data = completed.data.reverse();
        rejected.data = rejected.data.reverse();
        this.ordersData.push(completed);
        this.ordersData.push(rejected);

        this.ordersLoading = false;

      }, (err) => {
        console.log(err);
      });
  }

  getSales() {
    this.dashboardService.getSales()
      .subscribe((data) => {
        console.log('Sales', data);

        let income = { data: [], label: 'Gross Total' };
        let months = [];
        let total = 0;

        for (let item of data.data.sales) {
          income.data.push(parseFloat(item.gross_total));
          months.push(item.month_name);
          total += parseFloat(item.gross_total);
        }

        console.log('asd', months);
        income.data = income.data.reverse();
        this.salesDataLabel = months.reverse();
        this.salesData.push(income);
        this.salesTotal = total;
        this.salesLoading = false;

      }, (err) => {
        console.log(err);
      });
  }

}
