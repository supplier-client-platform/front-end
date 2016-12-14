import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../shared/services/common.service';
import {BrandService} from '../../shared/services/brand.service';
import {IBrandEditInfo, IBrandCreateInfo, IBrand} from '../../shared/models/brands.model';
import {IToastyObject} from '../../shared/models/common.model';
import {UserService} from '../../shared/services/user.service';
import {ViewChild} from '@angular/core/src/metadata/di';
import {ModalDirective} from 'ng2-bootstrap';


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})

/**
 * Class representing an brands component.
 */
export class BrandsComponent implements OnInit {
  public showAddNewBrand: boolean;
  public currentBrandID: number;
  public currentBrandName: string;
  public brands: IBrand;
  public toastyObject: IToastyObject;
  public newBrand: string;
  public showLoadMore: boolean;
  public originalBrandName: string;
  public searchTerm: string;
  public loading: boolean;
  public deleteBrandId: number;

  @ViewChild('delBrandModal') public delBrandModal: ModalDirective;

  constructor(private commonService: CommonService, private brandService: BrandService, private userService: UserService) {
    this.loading = true;
    this.showAddNewBrand = false;
    this.currentBrandID = -1;
    this.currentBrandName = null;
    this.originalBrandName = null;
    this.showLoadMore = false;
  }

  ngOnInit() {
    this.getBrands();
  }

  /**
   * Get the brand list from the API.
   */
  public getBrands(): void {
    let param = this.commonService.addQueryParams({supplier_id: this.userService.supplierID}, []);
    this.brandService.getBrands(param)
      .subscribe((data: any) => {
        this.brands = data;
        this.loading = false;
      }, (err) => {
        this.toastyObject = {title: 'Oops!', msg: 'Something Went Wrong! Please Try Again...', type: 'error'};
        this.commonService.toasty(this.toastyObject);
      });
  }

  /**
   * Edit the brand by sending a request to the REST API.
   */
  public editBrand(): void {
    this.toastyObject = {title: 'Saving....', msg: 'Please wait', type: 'info'};
    this.commonService.toasty(this.toastyObject);

    let obj: IBrandEditInfo = {
      id: this.currentBrandID,
      brandName: this.currentBrandName,
      businessID: this.userService.supplierID
    };
    this.brandService.editBrand(obj).subscribe((data: any) => {
      this.getBrands();
      this.toastyObject = {title: 'Success', msg: 'Brand Successfully Edited!', type: 'success'};
      this.commonService.toasty(this.toastyObject);
    }, (err) => {
      this.toastyObject = {title: 'Oops!', msg: 'Something Went Wrong! Please Try Again...', type: 'error'};
      this.commonService.toasty(this.toastyObject);
    });
  }

  /**
   * Create a brand a by sending request to the REST API.
   * @param values - new brand details.
   */
  public createBrand(values: any): void {
    this.toastyObject = {title: 'Saving....', msg: 'Please wait', type: 'info'};
    this.commonService.toasty(this.toastyObject);

    let obj: IBrandCreateInfo = {
      brandName: values.createBrandName,
      businessID: this.userService.supplierID
    };
    this.newBrand = null;
    this.brandService.saveBrand(obj).subscribe((data: any) => {
      this.getBrands();
      this.toastyObject = {title: 'Success', msg: 'Brand Successfully Added!', type: 'success'};
      this.commonService.toasty(this.toastyObject);
    }, (err) => {
      this.toastyObject = {title: 'Oops!', msg: 'Something Went Wrong! Please Try Again...', type: 'error'};
      this.commonService.toasty(this.toastyObject);
    });

    this.showAddNewBrand = false;
  }

  /**
   * Assign the brand details when clicking on the relevant brand.
   * @param id - brandID
   * @param name - brandName
   */
  public onRowClick(id, name): void {
    this.showAddNewBrand = false;
    this.currentBrandID = id;
    this.currentBrandName = name;
    this.originalBrandName = name;
  }

  /**
   * Cancel a brand edit.
   */
  public cancel(): void {
    this.currentBrandID = -1;
    this.currentBrandName = null;
    this.originalBrandName = null;
  }

  /**
   * Edit a brand.
   */
  public edit(): void {
    this.editBrand();
    this.currentBrandID = -1;
    this.currentBrandName = null;
    this.originalBrandName = null;
  }

  /**
   * On clicking the delete button show delete confirmation modal.
   * @param brandID - brand need to be deleted.
   */
  public onDelClick(brandID: any): void {
    this.deleteBrandId = brandID;
    this.delBrandModal.show();
  }

  /**
   * Delete brand by sending an API request.
   */
  public delete(): void {
    this.toastyObject = {title: 'Deleting....', msg: 'Please wait', type: 'info'};
    this.commonService.toasty(this.toastyObject);
    this.delBrandModal.hide();

    let param = {
      id: this.deleteBrandId
    };
    this.brandService.deleteBrand(param).subscribe((data: any) => {
      this.getBrands();
      this.toastyObject = {title: 'Success', msg: 'Brand Successfully Deleted!', type: 'success'};
      this.commonService.toasty(this.toastyObject);
    }, (err) => {
      this.toastyObject = {title: 'Oops!', msg: 'Something Went Wrong! Please Try Again...', type: 'error'};
      this.commonService.toasty(this.toastyObject);
    });
  }
}
