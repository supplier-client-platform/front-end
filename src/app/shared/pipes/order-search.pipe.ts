import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchOrder'
})

export class SearchOrderPipe implements PipeTransform {

  transform(value, term) {
    return term ? value.filter(this.filterOrder.bind(this, term)) : value;
  }

  private filterOrder(term: any, order: any): Boolean {
    let regex = new RegExp(term, 'i');
    let res = regex.test(order.customer_id) || regex.test(order.name) || regex.test(order.created_at)
      || regex.test(order.contact) || regex.test(order.status) || regex.test(order.email) || regex.test(order.net_total);
    return res;
  }
}
