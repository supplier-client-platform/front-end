import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-order-list-table',
  templateUrl: './order-list-table.component.html',
  styleUrls: ['./order-list-table.component.scss']
})

/**
 * Class representing an Order List Table Component.
 */
export class OrderListTableComponent implements OnInit {
  @Input() showSearch: boolean;
  @Input() orders: Array<any>;
  @Output() rowSelected = new EventEmitter();
  @Output() orderSelected = new EventEmitter();

  activatedRow: number;
  hideSearch: boolean;
  searchText: string;

  constructor() {
  }

  ngOnInit() {
    this.hideSearch = this.showSearch;
    this.activatedRow = 0;
  }

  /**
   * Activate the selected order.
   * @param order - order details.
   */
  public activateRow(order): void {
    this.activatedRow = order.id;
    this.rowSelected.emit(order);
  }

  /**
   * Activate the row class if this row is the selected one.
   * @param id
   * @returns {boolean}
   */
  public activateRowClass(id): boolean {
    return (id === this.activatedRow);
  }

  /**
   * Transmit the order selected details.
   * @param obj.
   */
  public transmitParent(obj): void {
    this.orderSelected.emit(obj);
  }
}
