import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchOrder'
})

/**
 * Class representing an Search Order Pipe
 */
export class SearchOrderPipe implements PipeTransform {

  /**
   * Function to transform the inputs to filters outputs.
   * @param value - input value.
   * @param term - search term.
   * @returns {any} - filtered results.
   */
  public transform(value, term) {
    return term ? value.filter(this.filterOrder.bind(this, term)) : value;
  }

  /**
   * Filter the order details according to the term using regex.
   * @param term - search term
   * @param order - order detail.
   * @returns {boolean}
   */
  private filterOrder(term: any, order: any): boolean {
    let regex = new RegExp(term, 'i');
    let res = regex.test(order.customer_id) || regex.test(order.name) || regex.test(order.created_at)
      || regex.test(order.contact) || regex.test(order.status) || regex.test(order.email) || regex.test(order.net_total);
    return res;
  }
}
