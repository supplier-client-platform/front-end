import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {

  constructor() { }

  addQueryParams(obj: Object, rules: Array<any>) {

    let params = '';

    for (let property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (obj[property] === undefined || rules.indexOf(obj[property]) !== -1) {
          delete obj[property];
        } else {
          params += property.toString().trim() + '=' + obj[property].toString().trim() + '&';
        }
      }
    }

    return params;
  }

}
