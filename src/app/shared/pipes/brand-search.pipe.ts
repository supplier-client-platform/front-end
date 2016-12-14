import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchBrand'
})

/**
 * Class representing an Search Brand Pipe.
 */
export class SearchBrandPipe implements PipeTransform {

  /**
   * Function to transform the inputs to filters outputs.
   * @param value - input value.
   * @param term - search term.
   * @returns {any} - filtered results.
   */
  public transform(value, term) {
    return term ? value.filter(this.filterBrand.bind(this, term)) : value;
  }

  /**
   * Filter the brand details according to the term using regex.
   * @param term - search term.
   * @param brand - brand detail.
   * @returns {boolean}
   */
  private filterBrand(term: any, brand: any): Boolean {
    let regex = new RegExp(term, 'i');
    let res = regex.test(brand.brandname);
    return res;
  }
}
