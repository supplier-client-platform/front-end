import { Component, OnInit } from '@angular/core';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { ProductService } from '../../../shared/services/product.service';
import { UserService } from '../../../shared/services/user.service';



interface CustomAttrib {
  label: string;
  value: string;
}
interface Template {
  id: number;
  name: string;
}

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {




  supplierID: number;
  src: string = '';
  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 300,
    resizeMaxWidth: 300
  };

  product: Object = {};
  customAtribs: Array<CustomAttrib>;

  template: Template;

  brandList: Array<Object> = [];
  categoryList: Array<Object> = [];
  templateList: Array<Object> = [];




  constructor(private productService: ProductService, private userService: UserService) {
    this.supplierID = userService.supplierID;
    this.reset();

    this.getBrands();
    this.getCategories();
    this.getTemplates();
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
    if ((this.customAtribs.length - 1) === id) {
      console.log('came here 1', this.customAtribs[id].label, this.customAtribs[id].value);
      if (this.customAtribs[id].label.trim() !== '' && this.customAtribs[id].value.trim() !== '') {
        this.customAtribs.push(
          {
            label: '',
            value: ''
          }
        );

        console.log('came here 2');
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
    console.log(values);

    let Obj: Object = {
      'name': values.productname,
      'brand_id': values.brandname,
      'price': values.price,
      'status': this.product['status'],
      'custom_attr': this.customAtribs,
      'supplier_id': this.supplierID,
      'img_url': this.src,
      'category_id': values.catname,
    };
    this.productService.createProduct(Obj).subscribe((data: any) => {
      console.log(data);
      this.reset();
      this.templateList = data.data;
    }, (err) => console.log(err));

    return false;
  }

  changeStatus(value) {
    this.product['status'] = value;
  }

  reset() {
    this.customAtribs = [
      {
        label: '',
        value: ''
      }
    ];
    this.template = {
      id: 0,
      name: ''
    };
  }

}
