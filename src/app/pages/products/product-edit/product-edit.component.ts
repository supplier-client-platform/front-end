import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { ProductService } from '../../../shared/services/product.service';
import { CommonService } from '../../../shared/services/common.service';
import { UserService } from '../../../shared/services/user.service';
import { IToastyObject } from '../../../shared/interfaces/common.interfaces';


/**
 * 
 * 
 * @export
 * @class ProductEditComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  /**
   * 
   * 
   * @type {number}
   * @memberOf ProductEditComponent
   */
  id: number;
  /**
   * 
   * 
   * @type {Object}
   * @memberOf ProductEditComponent
   */
  product: Object;
  /**
   * 
   * 
   * @type {number}
   * @memberOf ProductEditComponent
   */
  supplierID: number;
  /**
   * 
   * 
   * @type {Array<Object>}
   * @memberOf ProductEditComponent
   */
  brandList: Array<Object> = [];
  /**
   * 
   * 
   * @type {Array<Object>}
   * @memberOf ProductEditComponent
   */
  categoryList: Array<Object> = [];

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
   * @type {ResizeOptions}
   * @memberOf ProductEditComponent
   */
  resizeOptions: ResizeOptions = { resizeMaxHeight: 250, resizeMaxWidth: 250 };

  /**
   * Creates an instance of ProductEditComponent.
   * 
   * @param {ProductService} productService
   * @param {ActivatedRoute} activatedRoute
   * @param {CommonService} commonService
   * @param {UserService} userService
   * 
   * @memberOf ProductEditComponent
   */
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private commonService: CommonService,
    private userService: UserService) {
    this.id = activatedRoute.snapshot.params['id'];
    this.supplierID = userService.supplierID;
    this.product = {};
    this.getProduct();
    this.getBrands();
    this.getCategories();

  }

  /**
   * 
   * 
   * 
   * @memberOf ProductEditComponent
   */
  ngOnInit() {

  }


  /**
   * 
   * 
   * @param {ImageResult} imageResult
   * 
   * @memberOf ProductEditComponent
   * Converts the updated image to base64 dataURL
   */
  selected(imageResult: ImageResult) {
    this.product['img_url'] = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
  }

  /**
   * 
   * 
   * @private
   * 
   * @memberOf ProductEditComponent
   * Invokes the getProduct Service by catching the product ID from URL
   */
  private getProduct() {
    this.productService.getProduct(this.id)
      .subscribe((data: any) => {
        console.log(data);
        this.product = data.data[0];
        if (!this.product['custom_attr']) {
          this.product['custom_attr'] = [];
        }
        this.product['custom_attr'].push({ label: '', value: '' });
      });
  }


  /**
   * 
   * 
   * @private
   * 
   * @memberOf ProductEditComponent
   * Gets all the brands related to a certain supplier
   */
  private getBrands() {
    this.productService.getBrands(this.supplierID)
      .subscribe((data: any) => this.brandList = data, (err) => console.log(err));
  }


  /**
   * 
   * 
   * @private
   * 
   * @memberOf ProductEditComponent
   * Gets All the categories related to a certain supplier
   */
  private getCategories() {
    this.productService.getCategories()
      .subscribe((data: any) => this.categoryList = data, (err) => console.log(err));
  }

  /**
   * 
   * 
   * @param {any} id
   * 
   * @memberOf ProductEditComponent
   * Detects changes in custom attributes and adds an empty row to the UI
   */
  detectChange(id) {
    console.log(id);
    if ((this.product['custom_attr'].length - 1) === id) {
      if (this.product['custom_attr'][id].label.trim() !== '' && this.product['custom_attr'][id].value.trim() !== '') {
        this.product['custom_attr'].push({ label: '', value: '' });
      }
    }
  }

  /**
   * 
   * 
   * @param {any} values
   * 
   * @memberOf ProductEditComponent
   * Submit the updated product module
   */
  formSubmit(values) {

    // ** Start:Rremove unncessary custom attribs with "" values
    let arr = [];
    this.product['custom_attr'].map((value, key) => {
      if (value.label.trim() === '' && value.value.trim() === '') {
        arr.push(key);
      }
    });


    let count = 0;
    arr.map((value) => {
      this.product['custom_attr'].splice((value - count), 1);
      count++;
    });
    // ** End:Rremove unncessary custom attribs with "" values

    // Calling the update service
    this.productService.updateProduct(this.product)
      .subscribe((data: any) => {
        this.toastyObject = { title: 'Success', msg: 'Product Successfully Updated!', type: 'success' };
        this.commonService.toasty(this.toastyObject);
        this.reset();
      }, (err) => {
        this.toastyObject = { title: 'Oops!', msg: 'Something Went Wrong! Please Try Again...', type: 'error' };
        this.commonService.toasty(this.toastyObject);
      });
  }

  /**
   * 
   * 
   * @param {any} value
   * 
   * @memberOf ProductEditComponent
   * Change between Draft/Published on product status
   */
  changeStatus(value) {
    this.product['status'] = value;
  }
  /**
   * 
   * 
   * @param {any} i
   * 
   * @memberOf ProductEditComponent
   * Remove a Custom Attrib of user's choice
   */
  removeAttrib(i) {
    this.product['custom_attr'].splice(i, 1);
  }

  /**
   * 
   * 
   * 
   * @memberOf ProductEditComponent
   * Reset the product module to it's previous state
   */
  reset() {
    this.getProduct();
  }
}
