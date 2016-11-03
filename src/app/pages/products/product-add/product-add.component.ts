import { Component, OnInit } from '@angular/core';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { ProductService } from '../../../shared/services/product.service';
import { UserService } from '../../../shared/services/user.service';
import { IMG_CONST } from '../../../shared/config/img.constants';
import { CustomAttrib } from '../product.interfaces';
import { IToastyObject } from '../../../shared/models/common.model';
import { CommonService } from '../../../shared/services/common.service';
import { Router } from '@angular/router';



/**
 *
 *
 * @export
 * @class ProductAddComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {




  /**
   *
   *
   * @type {number}
   * @memberOf ProductAddComponent
   */
  supplierID: number;
  /**
   *
   *
   * @type {string}
   * @memberOf ProductAddComponent
   */
  src: string = '';
  /**
   *
   *
   * @type {ResizeOptions}
   * @memberOf ProductAddComponent
   */
  resizeOptions: ResizeOptions = { resizeMaxHeight: 250, resizeMaxWidth: 250 };

  /**
   *
   *
   * @type {Object}
   * @memberOf ProductAddComponent
   */
  product: Object = {};
  /**
   *
   *
   * @type {Array<CustomAttrib>}
   * @memberOf ProductAddComponent
   */
  customAtribs: Array<CustomAttrib>;

  /**
   *
   *
   * @type {IToastyObject}
   * @memberOf ProductEditComponent
   */
  toastyObject: IToastyObject;

  /**
   *
   *
   * @type {Array<Object>}
   * @memberOf ProductAddComponent
   */
  brandList: Array<Object> = [];
  /**
   *
   *
   * @type {Array<Object>}
   * @memberOf ProductAddComponent
   */
  categoryList: Array<Object> = [];
  /**
   *
   *
   * @type {Array<Object>}
   * @memberOf ProductAddComponent
   */
  templateList: Array<Object> = [];

  /**
   *
   *
   * @type {Object}
   * @memberOf ProductAddComponent
   */
  template: Object;


  /**
   * Creates an instance of ProductAddComponent.
   *
   * @param {ProductService} productService
   * @param {UserService} userService
   *
   * @memberOf ProductAddComponent
   */
  constructor(private productService: ProductService, private userService: UserService, private commonService: CommonService,
    private router: Router) {
    this.supplierID = userService.supplierID;
    this.reset();

    this.getBrands();
    this.getCategories();
    this.getTemplates();
    this.src = IMG_CONST.IMG_PRODUCT;
  }

  /**
   *
   *
   *
   * @memberOf ProductAddComponent
   */
  ngOnInit() {

  }

  /**
   *
   *
   * @param {ImageResult} imageResult
   *
   * @memberOf ProductAddComponent
   * Handle Image Select
   */
  selected(imageResult: ImageResult) {
    this.src = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
  }

  /**
   *
   *
   * @param {any} id
   *
   * @memberOf ProductAddComponent
   * Handle custom Attribs adding a new row dynamically upon filling all fileds
   */
  detectChange(id) {
    if ((this.customAtribs.length - 1) === id && this.template['id'] === 0) {
      if (this.customAtribs[id].label.trim() !== '' && this.customAtribs[id].value.trim() !== '') {
        this.customAtribs.push({ label: '', value: '' });
      }
    }
  }

  /**
   *
   *
   * @private
   *
   * @memberOf ProductAddComponent
   * Get Brands
   */
  private getBrands() {
    this.productService.getBrands(this.supplierID)
      .subscribe((data: any) => {
        this.brandList = data;
        this.product['brand'] = this.brandList[0]['id'];
      }, (err) => console.log(err));
  }

  /**
   *
   *
   * @private
   *
   * @memberOf ProductAddComponent
   * Get Categories
   */
  private getCategories() {
    this.productService.getCategories()
      .subscribe((data: any) => {
        this.categoryList = data;
        this.product['cat'] = this.categoryList[0]['id'];
      }, (err) => console.log(err));
  }

  /**
   *
   *
   * @private
   *
   * @memberOf ProductAddComponent
   * Get templates
   */
  private getTemplates() {
    this.productService.getTemplates(this.supplierID)
      .subscribe((data: any) => {
        console.log(data);
        this.templateList = data.data;
      }, (err) => console.log(err));
  }

  /**
   *
   *
   * @param {any} values
   * @returns
   *
   * @memberOf ProductAddComponent
   * Handle form submit on product add
   */
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

    // ** Start:Rremove unncessary custom attribs with "" values
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
    // ** End:Rremove unncessary custom attribs with "" values

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

  /**
   *
   *
   * @param {any} value
   *
   * @memberOf ProductAddComponent
   * Change Product Status
   */
  changeStatus(value) {
    this.product['status'] = value;
  }

  /**
   *
   *
   * @param {string} id
   *
   * @memberOf ProductAddComponent
   * Change template components for custom Attribs
   */
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

  /**
   *
   *
   *
   * @memberOf ProductAddComponent
   * Clean All atrribs
   */
  cleanAtrribs() {
    this.customAtribs.map((value, key) => {
      this.customAtribs[key]['value'] = '';
    });
  }

  /**
   *
   *
   * @param {any} i
   *
   * @memberOf ProductAddComponent
   * Remove a Custom Attrib of user's choice
   */
  removeAttrib(i) {
    this.product['custom_attr'].splice(i, 1);
  }
  /**
   *
   *
   *
   * @memberOf ProductAddComponent
   */
  reset() {
    this.customAtribs = [{ label: '', value: '' }];
    this.template = { id: 0, name: '' };
    this.src = IMG_CONST.IMG_PRODUCT;

  }

}
