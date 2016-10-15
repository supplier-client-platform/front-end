import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-list-table',
  templateUrl: './order-list-table.component.html',
  styleUrls: ['./order-list-table.component.scss']
})
export class OrderListTableComponent implements OnInit {
  @Input() showSearch: boolean;
  @Input() orders: Array<any>;
  @Output() rowSelected = new EventEmitter();

  activatedRow: number = 0;
  hideSearch: boolean;

  constructor() { }

  ngOnInit() {
    this.hideSearch = this.showSearch;
  }


  activateRow(order) {
    this.activatedRow = order.id;
    this.rowSelected.emit(order);
  }

  activateRowClass(id) {
    return (id === this.activatedRow);
  }
}
