import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { CommonService } from '../../../shared/services/common.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  id: number;
  product: Object;
  enableBrandOptions: Boolean;
  brandList: Array<Object>;
  templateList: Object;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private commonService: CommonService) { 
    this.id = activatedRoute.snapshot.params['id'];
    this.enableBrandOptions = false;
    this.product = {};
    this.brandList = [];
    this.templateList = {};
  }

  ngOnInit() {
    this.getProduct();
    this.getBrands();
  }

  private getProduct() {
    this.productService.getProduct(this.id)
      .subscribe((data: any) => {
        this.product = data;
        console.log(this.product);
      });
  }

  private getBrands() {
    this.productService.getBrands()
      .subscribe((data: any) => {
        this.brandList = data.data;
        this.enableBrandOptions = true;
      });
  }
}
