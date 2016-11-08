import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../shared/services/common.service';
import {BrandService} from '../../shared/services/brand.service';
import {IBrandEditInfo, IBrandCreateInfo, IBrand} from '../../shared/models/brands.model';
import {IToastyObject} from '../../shared/models/common.model';


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})

export class BrandsComponent implements OnInit {
  public isCollapsed: boolean;
  public currentBrandID: number;
  public currentBrandName: string;
  public brands: IBrand;
  public toastyObject: IToastyObject;
  public newBrand: string;
  public showLoadMore: boolean = false;

  constructor(private commonService: CommonService, private brandService: BrandService) {
    this.isCollapsed = true;
    this.currentBrandID = -1;
    this.currentBrandName = null;
  }

  ngOnInit() {
    this.getBrands();
  }

  getBrands() {
    let param = this.commonService.addQueryParams({supplier_id: 1}, []);
    this.brandService.getBrands(param)
      .subscribe((data: any) => {
        this.brands = data;
      }, (err) => {
        this.toastyObject = { title: 'Oops!', msg: 'Something Went Wrong! Please Try Again...', type: 'error' };
        this.commonService.toasty(this.toastyObject);
      });
  }

  editBrand() {
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

    this.isCollapsed = true;
  }

  public collapsed(event: any): void {
    //
  }

  public expanded(event: any): void {
    this.currentBrandName = null;
    this.currentBrandID = -1;
  }

  public onRowClick(id, name) {
    this.isCollapsed = true;
    this.currentBrandID = id;
    this.currentBrandName = name;
  }

  public cancel() {
    this.currentBrandID = -1;
    this.currentBrandName = null;
  }

  public edit() {
    this.editBrand();
    this.currentBrandID = -1;
    this.currentBrandName = null;
  }
}
