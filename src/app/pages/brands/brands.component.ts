import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import { BrandService } from '../../shared/services/brand.service';
import { IBrandEditInfo, IBrandCreateInfo, IBrand } from '../../shared/models/brands.model';
import { IToastyObject } from '../../shared/models/common.model';


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})

export class BrandsComponent implements OnInit {
  public showAddNewBrand: boolean;
  public currentBrandID: number;
  public currentBrandName: string;
  public brands: IBrand;
  public toastyObject: IToastyObject;
  public newBrand: string;
  public showLoadMore: boolean = false;
  public originalBrandName: string;
  public searchTerm: string;
  loading: boolean;

  constructor(private commonService: CommonService, private brandService: BrandService) {
    this.loading = true;
    this.showAddNewBrand = false;
    this.currentBrandID = -1;
    this.currentBrandName = null;
    this.originalBrandName = null;
  }

  ngOnInit() {
    this.getBrands();
  }

  getBrands() {
    let param = this.commonService.addQueryParams({ supplier_id: 1 }, []);
    this.brandService.getBrands(param)
      .subscribe((data: any) => {
        this.brands = data;
        this.loading = false;
      }, (err) => {
        this.toastyObject = { title: 'Oops!', msg: 'Something Went Wrong! Please Try Again...', type: 'error' };
        this.commonService.toasty(this.toastyObject);
      });
  }

  editBrand() {
    this.toastyObject = { title: 'Saving....', msg: 'Please wait', type: 'info' };
    this.commonService.toasty(this.toastyObject);

    let obj: IBrandEditInfo = {
      id: this.currentBrandID,
      brandName: this.currentBrandName,
      businessID: 1
    };
    this.brandService.editBrand(obj).subscribe((data: any) => {
      this.getBrands();
      this.toastyObject = { title: 'Success', msg: 'Brand Successfully Edited!', type: 'success' };
      this.commonService.toasty(this.toastyObject);
    }, (err) => {
      this.toastyObject = { title: 'Oops!', msg: 'Something Went Wrong! Please Try Again...', type: 'error' };
      this.commonService.toasty(this.toastyObject);
    });
  }

  public createBrand(values: any) {
    this.toastyObject = { title: 'Saving....', msg: 'Please wait', type: 'info' };
    this.commonService.toasty(this.toastyObject);

    let obj: IBrandCreateInfo = {
      brandName: values.createBrandName,
      businessID: 1
    };
    this.newBrand = null;
    this.brandService.saveBrand(obj).subscribe((data: any) => {
      this.getBrands();
      this.toastyObject = { title: 'Success', msg: 'Brand Successfully Added!', type: 'success' };
      this.commonService.toasty(this.toastyObject);
    }, (err) => {
      this.toastyObject = { title: 'Oops!', msg: 'Something Went Wrong! Please Try Again...', type: 'error' };
      this.commonService.toasty(this.toastyObject);
    });

    this.showAddNewBrand = false;
  }

  public collapsed(event: any): void {
    //
  }

  public expanded(event: any): void {
    this.currentBrandName = null;
    this.originalBrandName = null;
    this.currentBrandID = -1;
  }

  public onRowClick(id, name) {
    this.showAddNewBrand = false;
    this.currentBrandID = id;
    this.currentBrandName = name;
    this.originalBrandName = name;
  }

  public cancel() {
    this.currentBrandID = -1;
    this.currentBrandName = null;
    this.originalBrandName = null;
  }

  public edit() {
    this.editBrand();
    this.currentBrandID = -1;
    this.currentBrandName = null;
    this.originalBrandName = null;
  }
}
