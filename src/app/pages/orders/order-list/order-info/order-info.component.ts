import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { OrderService } from '../../../../shared/services/order.service';
import { CommonService } from '../../../../shared/services/common.service';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent implements OnInit, OnChanges {
  @Input() orderInfo: any = {};
  orderProducts: Array<any> = [];

  animationStatus: boolean = false;

  constructor(private commonService: CommonService, private orderService: OrderService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.animationStatus = false;
    if (this.orderInfo) {
      this.getOrderProducts();
    }

  }

  getOrderProducts() {
    this.orderService.getOrderItems(this.orderInfo.id)
      .subscribe((data: any) => {
        this.orderProducts = data.data;
        this.animationStatus = true;
      });
  }

}
