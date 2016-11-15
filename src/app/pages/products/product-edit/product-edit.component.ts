import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { ProductService } from '../../../shared/services/product.service';
import { CommonService } from '../../../shared/services/common.service';
import { UserService } from '../../../shared/services/user.service';
import { IToastyObject } from '../../../shared/models/common.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  id: number;
  product: Object;
  supplierID: number;
  brandList: Array<Object> = [];
  categoryList: Array<Object> = [];
  toastyObject: IToastyObject;
  resizeOptions: ResizeOptions = { resizeMaxHeight: 250, resizeMaxWidth: 250 };
  loading: boolean = true;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private commonService: CommonService,
    private userService: UserService) {
    this.id = activatedRoute.snapshot.params['id'];
    this.supplierID = userService.supplierID;
    this.product = {};
    this.getProduct();
    this.getBrands();
    this.getCategories();

  }

  ngOnInit() {
  }

  selected(imageResult: ImageResult) {
    this.product['img_url'] = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
  }

  private getProduct() {
    this.productService.getProduct(this.id)
      .subscribe((data: any) => {
        console.log(data);
        this.product = data.data[0];
        if (!this.product['custom_attr']) {
          this.product['custom_attr'] = [];
        }
        this.product['custom_attr'].push({ label: '', value: '' });
        this.loading = false;
      }, (err) => {
        console.log('not found');
      });
  }

  private getBrands() {
    this.productService.getBrands(this.supplierID)
      .subscribe((data: any) => this.brandList = data, (err) => console.log(err));
  }

  private getCategories() {
    this.productService.getCategories()
      .subscribe((data: any) => this.categoryList = data, (err) => console.log(err));
  }

  detectChange(id) {
    console.log(id);
    if ((this.product['custom_attr'].length - 1) === id) {
      if (this.product['custom_attr'][id].label.trim() !== '' && this.product['custom_attr'][id].value.trim() !== '') {
        this.product['custom_attr'].push({ label: '', value: '' });
      }
    }
  }

  formSubmit(values) {

    this.toastyObject = { title: 'Saving....', msg: 'Please wait', type: 'info' };
    this.commonService.toasty(this.toastyObject);

    // ** Start:Remove unncessary custom attributes with "" values
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
    // ** End:Remove unncessary custom attributes with "" values

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

  changeStatus(value) {
    this.product['status'] = value;
  }

  removeAttrib(i) {
    this.product['custom_attr'].splice(i, 1);
  }

  reset() {
    this.getProduct();
  }
}
