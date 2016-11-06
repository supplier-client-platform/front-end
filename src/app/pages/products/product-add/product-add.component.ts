import { Component, OnInit } from '@angular/core';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { ProductService } from '../../../shared/services/product.service';
import { UserService } from '../../../shared/services/user.service';
import { IMG_CONST } from '../../../shared/config/img.constants';
import { CustomAttrib } from '../product.interfaces';
import { IToastyObject } from '../../../shared/models/common.model';
import { CommonService } from '../../../shared/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  supplierID: number;
  src: string = '';
  resizeOptions: ResizeOptions = { resizeMaxHeight: 250, resizeMaxWidth: 250 };
  product: Object = {};
  customAtribs: Array<CustomAttrib>;
  toastyObject: IToastyObject;
  brandList: Array<Object> = [];
  categoryList: Array<Object> = [];
  templateList: Array<Object> = [];
  template: Object;

  constructor(private productService: ProductService, private userService: UserService, private commonService: CommonService,
    private router: Router) {
    this.supplierID = userService.supplierID;
    this.reset();

    this.getBrands();
    this.getCategories();
    this.getTemplates();
    this.src = IMG_CONST.IMG_PRODUCT;
  }

  ngOnInit() {

  }

  selected(imageResult: ImageResult) {
    this.src = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
  }

  detectChange(id) {
    if ((this.customAtribs.length - 1) === id && this.template['id'] === 0) {
      if (this.customAtribs[id].label.trim() !== '' && this.customAtribs[id].value.trim() !== '') {
        this.customAtribs.push({ label: '', value: '' });
      }
    }
  }

  private getBrands() {
    this.productService.getBrands(this.supplierID)
      .subscribe((data: any) => {
        this.brandList = data;
        this.product['brand'] = this.brandList[0]['id'];
      }, (err) => console.log(err));
  }

  private getCategories() {
    this.productService.getCategories()
      .subscribe((data: any) => {
        this.categoryList = data;
        this.product['cat'] = this.categoryList[0]['id'];
      }, (err) => console.log(err));
  }

  private getTemplates() {
    this.productService.getTemplates(this.supplierID)
      .subscribe((data: any) => {
        console.log(data);
        this.templateList = data.data;
      }, (err) => console.log(err));
  }

  formSubmit(values) {
    this.toastyObject = { title: 'Saving....', msg: 'Please wait', type: 'info' };
    this.commonService.toasty(this.toastyObject);

    // Build product Object
    let Obj: Object = {
      'name': values.productname,
      'brand_id': values.brandname,
      'price': values.price,
      'status': this.product['status'],
      'custom_attr': this.customAtribs,
      'supplier_id': this.supplierID,
      'img_url': this.src,
      'category_id': values.catname,
      'template_id': this.template['id'],
      'template_name': this.template['name']
    };

    // ** Start:Remove unncessary custom attributes with "" values
    let arr = [];
    Obj['custom_attr'].map((value, key) => {
      if (value.label.trim() === '' && value.value.trim() === '') {
        arr.push(key);
      }
    });

    let count = 0;
    arr.map((value) => {
      Obj['custom_attr'].splice((value - count), 1);
      count++;
    });
    // ** End:Remove unncessary custom attributes with "" values

    // Calling the insert service
    this.productService.createProduct(Obj).subscribe((data: any) => {
      console.log(data);
      this.reset();
      this.getTemplates();
      this.toastyObject = { title: 'Success', msg: 'Product Successfully Added!', type: 'success' };
      this.commonService.toasty(this.toastyObject);
      this.router.navigate(['/', 'product', 'list']);
    }, (err) => {
      console.log(err);
      this.toastyObject = { title: 'Oops!', msg: 'Something Went Wrong! Please Try Again...', type: 'error' };
      this.commonService.toasty(this.toastyObject);
    });

    return false;
  }

  changeStatus(value) {
    this.product['status'] = value;
  }

  templateChange(id: string) {

    this.template['id'] = id;

    if (this.template['id'] === 0) {
      this.customAtribs = [{ label: '', value: '' }];
    } else {
      this.templateList.map((value, key) => {
        console.log('for', value['id']);

        // cannot use object literal === here because of the expected functionality
        if (value['id'] == id) {
          console.log(value['custom_attr']);
          this.customAtribs = value['custom_attr'];
          this.cleanAtrribs();
        }
      });

    }
  }

  cleanAtrribs() {
    this.customAtribs.map((value, key) => {
      this.customAtribs[key]['value'] = '';
    });
  }

  removeAttrib(i) {
    this.product['custom_attr'].splice(i, 1);
  }

  reset() {
    this.customAtribs = [{ label: '', value: '' }];
    this.template = { id: 0, name: '' };
    this.src = IMG_CONST.IMG_PRODUCT;

  }

}
