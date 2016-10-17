import { Injectable } from '@angular/core';
import { ToastyService, ToastyConfig } from 'ng2-toasty';

@Injectable()
export class CommonService {


  toastOptions = {
    title: '',
    msg: '',
    showClose: true,
    timeout: 5000,
    theme: 'bootstrap',
  };
  constructor(private toastyService: ToastyService, private toastyConfig: ToastyConfig) {

  }

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

  toasty(param) {

    this.toastOptions.title = param['title'];
    this.toastOptions.msg = param['msg'];
    this.toastyService.clearAll();
    switch (param['type']) {
      case 'default': this.toastyService.default(this.toastOptions); break;
      case 'info': this.toastyService.info(this.toastOptions); break;
      case 'success': this.toastyService.success(this.toastOptions); break;
      case 'wait': this.toastyService.wait(this.toastOptions); break;
      case 'error': this.toastyService.error(this.toastOptions); break;
      case 'warning': this.toastyService.warning(this.toastOptions); break;
    }

  }

}
