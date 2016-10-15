import { Component, OnInit } from '@angular/core';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { ProductService } from '../../../shared/services/product.service';
import { UserService } from '../../../shared/services/user.service';
import { IMG_CONST } from '../../../shared/config/img.constants';



interface CustomAttrib {
  label: string;
  value: string;
}

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {




  supplierID: number;
  src: string = '';
  resizeOptions: ResizeOptions = { resizeMaxHeight: 200, resizeMaxWidth: 200 };

  product: Object = {};
  customAtribs: Array<CustomAttrib>;

  template: Object;

  brandList: Array<Object> = [];
  categoryList: Array<Object> = [];
  templateList: Array<Object> = [];




  constructor(private productService: ProductService, private userService: UserService) {
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
    console.log(id);
    if ((this.customAtribs.length - 1) === id && this.template['id'] === 0) {
      if (this.customAtribs[id].label.trim() !== '' && this.customAtribs[id].value.trim() !== '') {
        this.customAtribs.push({ label: '', value: '' });
      }
    }
  }

  private getBrands() {
    this.productService.getBrands(this.supplierID)
      .subscribe((data: any) => this.brandList = data);
  }

  private getCategories() {
    this.productService.getCategories()
      .subscribe((data: any) => this.categoryList = data);
  }

  private getTemplates() {
    this.productService.getTemplates(this.supplierID)
      .subscribe((data: any) => {
        console.log(data);
        this.templateList = data.data;
      });
  }

  formSubmit(values) {

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

    this.productService.createProduct(Obj).subscribe((data: any) => {
      console.log(data);
      this.reset();
      this.getTemplates();
    }, (err) => console.log(err));

    return false;
  }

  changeStatus(value) {
    this.product['status'] = value;
  }

  templateChange(id: string) {

    this.template['id'] = id;
    console.log(this.template['id'], id);

    if (this.template['id'] === 0) {
      this.customAtribs = [{ label: '', value: '' }];

    } else {

      this.templateList.map((value, key) => {
        console.log('for', value['id']);

        if (value['id'] == id) {
          console.log(value['custom_attr']);
          this.customAtribs = value['custom_attr'];
          this.cleanAtrribs();
        }
      });

    }

    // this.customAtribs;
  }

  cleanAtrribs() {
    this.customAtribs.map((value, key) => {
      this.customAtribs[key]['value'] = '';
    });
  }
  reset() {
    this.customAtribs = [{ label: '', value: '' }];
    this.template = { id: 0, name: '' };
  }

}
