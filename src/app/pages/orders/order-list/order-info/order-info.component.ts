import { Component, OnInit, Input, OnChanges, Output, EventEmitter  } from '@angular/core';
import { OrderService } from '../../../../shared/services/order.service';
import { CommonService } from '../../../../shared/services/common.service';
import {IToastyObject} from '../../../../shared/models/common.model';


@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent implements OnInit, OnChanges {
  @Input() orderInfo: any = {};
  @Output() orderSelected = new EventEmitter();
  orderProducts: Array<any> = [];
  animationStatus: boolean = false;
  toastyObject: IToastyObject;

  constructor(private commonService: CommonService, private orderService: OrderService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.animationStatus = false;
    if (this.orderInfo) {
      this.orderService.getProducts({
        orderID: this.orderInfo.id
      }).subscribe((data: any) => {
        this.orderProducts= data.data;
        this.animationStatus = true;
      }, (err) => {
          this.toastyObject = { title: 'Oops!', msg: 'Something Went Wrong! Please Try Again...', type: 'error' };
          this.commonService.toasty(this.toastyObject);
        });
    }
  }

  changeOrderStatus(status: string): void {
    this.orderSelected.emit(status);
  }
}
