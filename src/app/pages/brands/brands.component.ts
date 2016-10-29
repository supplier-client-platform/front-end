import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../shared/services/common.service';
import {BrandService} from '../../shared/services/brand.service';
import {IBrandEditInfo, IBrandCreateInfo, IBrand} from '../../shared/models/brands.model';

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
    }, (err) => {
      console.log(err);
    });
  }

  public createBrand(values: any) {
    let obj: IBrandCreateInfo = {
      brandName: values.createBrandName,
      businessID: 1
    };

    this.brandService.saveBrand(obj).subscribe((data: any) => {
      this.getBrands();
    }, (err) => {
      console.log(err);
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

  public onRowClick(id) {
    this.isCollapsed = true;
    this.currentBrandID = id;
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
