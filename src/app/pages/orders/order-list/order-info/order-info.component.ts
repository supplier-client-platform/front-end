import { Component, OnInit, Input, OnChanges, Output, EventEmitter  } from '@angular/core';
import { OrderService } from '../../../../shared/services/order.service';
import { CommonService } from '../../../../shared/services/common.service';

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

  constructor(private commonService: CommonService, private orderService: OrderService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.animationStatus = false;
    if (this.orderInfo) {
      this.orderProducts = JSON.parse(this.orderInfo.shopping_list);
      this.animationStatus = true;
    }
  }

  changeOrderStatus(status: string): void {
    this.orderSelected.emit(status);
  }
}
