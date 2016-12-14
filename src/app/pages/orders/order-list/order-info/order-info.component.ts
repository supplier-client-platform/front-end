import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { OrderService } from '../../../../shared/services/order.service';
import { CommonService } from '../../../../shared/services/common.service';
import { IToastyObject } from '../../../../shared/models/common.model';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss']
})

/**
 * Class representing an Order Info Component.
 */
export class OrderInfoComponent implements OnInit, OnChanges {
  @Input() orderInfo: any = {};
  @Output() orderSelected = new EventEmitter();
  orderProducts: Array<any> = [];
  animationStatus: boolean = false;
  toastyObject: IToastyObject;
  loading: boolean = true;

  constructor(private commonService: CommonService, private orderService: OrderService) {
  }

  ngOnInit() {
    this.getOrderDetails();
  }

  ngOnChanges() {
    this.animationStatus = false;
  }

  /**
   * Triggered when order status is changed.
   * @param status - status of the orrder.
   */
  public changeOrderStatus(status: string): void {
    let obj = {
      status: status,
      orderInfo: this.orderInfo
    };
    this.orderSelected.emit(obj);
  }

  /**
   * Get order details from the REST API using order service.
   */
  public getOrderDetails(): void {
    if (this.orderInfo) {
      this.orderService.getProducts({
        orderID: this.orderInfo.id
      }).subscribe((data: any) => {
        this.orderProducts = data;
        this.animationStatus = true;
        this.loading = false;
      }, (err) => {
        this.toastyObject = { title: 'Oops!', msg: 'Something Went Wrong! Please Try Again...', type: 'error' };
        this.commonService.toasty(this.toastyObject);
        this.loading = false;
      });
    }
  }
}
