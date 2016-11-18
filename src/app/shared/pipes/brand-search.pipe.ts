import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchBrand'
})

export class SearchBrandPipe implements PipeTransform {

  transform(value, term) {
    return term ? value.filter(this.filterBrand.bind(this, term)) : value;
  }

  private filterBrand(term: any, brand: any): Boolean {
    debugger;
    let regex = new RegExp(term, 'i');
    let res = regex.test(brand.brandname);
    return res;
  }
}
