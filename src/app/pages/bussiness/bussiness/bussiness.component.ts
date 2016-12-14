import {Component, OnInit, ViewChild} from '@angular/core';
import {ImageResult, ResizeOptions} from 'ng2-imageupload';
import {CommonService} from '../../../shared/services/common.service';
import {UserService} from '../../../shared/services/user.service';
import {IToastyObject} from '../../../shared/models/common.model';
import {UserState} from '../../../shared/reducers/user.reducer';
import {ModalDirective} from 'ng2-bootstrap';

@Component({
  selector: 'app-bussiness',
  templateUrl: './bussiness.component.html',
  styleUrls: ['./bussiness.component.scss']
})

/**
 * Class representing an Business Component.
 */
export class BussinessComponent implements OnInit {
  @ViewChild('passwordModal') public passwordModal: ModalDirective;
  @ViewChild('delModal') public delModal: ModalDirective;
  @ViewChild('branchModal') public branchModal: ModalDirective;

  toastyObject: IToastyObject;

  user: Object = {};
  bussiness: Object = {};
  bussinessAdress: Object = {};
  bussinessAdressEdit: String;
  categories: Array<Object> = [];
  cities: Array<Object> = [];
  passMatch: boolean = true;
  authPass: boolean = true;
  loading: boolean = false;
  unauthorizeCount: number = 0;
  saveSuccess: boolean = false;
  userPass: Object = {new: '', old: '', confirm: ''};
  userView: Object = {};
  bussinessView: Object = {};
  branch: Object = {name: '', phone: '', address: '', lat: '', lng: ''};
  coords: Object;
  branchMap: Boolean = false;
  title: string = '';
  lat: number;
  lng: number;
  branchList: Array<Object> = [];
  userInfoLoading: boolean = true;
  bussinessInfoLoading: boolean = true;
  pinList: Array<Object> = [];
  delObject: Object = {};
  updateFlag: Boolean = false;

  map: boolean = false;

  images: Object = {
    bussiness: 'http://www.maxtechagency.com/img/team/no-image-available.jpg',
    user: 'http://www.maxtechagency.com/img/team/no-image-available.jpg'
  };

  src: string = '';
  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 275,
    resizeMaxWidth: 275
  };

  constructor(private commonService: CommonService, private userService: UserService) {
    this.getUserDetails();
    this.getBussinessDetails();
    this.getCategories();
    this.getCities();
    this.loadBranches();
  }

  ngOnInit() {
  }

  /**
   * Trigger this event when image is selected to updload.
   * @param imageResult
   * @param type
   */
  public selected(imageResult: ImageResult, type): void {
    if (type === 'bussiness') {
      this.images['bussiness'] = imageResult.resized
        && imageResult.resized.dataURL
        || imageResult.dataURL;
    } else {
      this.images['user'] = imageResult.resized
        && imageResult.resized.dataURL
        || imageResult.dataURL;
    }
  }

  /**
   * Get the user details from the REST API using user service.
   */
  public getUserDetails(): void {
    this.userService.userInfo.subscribe((data: UserState) => {
      this.user = data.user;
      if (Object.getOwnPropertyNames(this.user).length > 0) {
        this.userView = <Object>JSON.parse(JSON.stringify(this.user));

        if (this.user['image'] !== null && this.user['image'] !== '') {
          this.images['user'] = this.user['image'];
        }
        this.userInfoLoading = false;
      }
    }, (err) => {
      console.log(err);
    });
  }

  /**
   * Get the business details from the REST API using user service.
   */
  public getBussinessDetails(): void {
    this.userService.userInfo.subscribe((data: UserState) => {
      this.bussiness = data.bussiness;

      if (Object.getOwnPropertyNames(this.bussiness).length > 0) {
        this.bussinessView = <Object>JSON.parse(JSON.stringify(this.bussiness));

        this.bussinessAdress = JSON.parse(this.bussiness['address']);
        this.bussinessAdressEdit = this.bussinessAdress['address'];
        this.title = this.bussiness['name'];
        this.lat = parseFloat(this.bussinessAdress['latitude']);
        this.lng = parseFloat(this.bussinessAdress['longitude']);
        this.map = true;
        this.branch['lat'] = this.lat;
        this.branch['lng'] = this.lng;
        this.bussinessInfoLoading = false;

        if (this.bussiness['image'] !== null && this.bussiness['image'] !== '') {
          this.images['bussiness'] = this.bussiness['image'];
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  /**
   * Get the categories from the REST API using user service.
   */
  public getCategories(): void {
    this.userService.getBussinessCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  /**
   * Get the city details from the REST API using user service.
   */
  public getCities(): void {
    this.userService.getCities().subscribe((data) => {
      this.cities = data;
    });
  }

  /**
   * Update the business details.
   */
  public bussinessUpdate(): void {

    let Obj = this.bussiness;
    // build address
    Obj['address'] = JSON.stringify({
      address: this.bussinessAdressEdit,
      latitude: this.lat,
      longitude: this.lng
    });

    // parse Image
    Obj['image'] = this.images['bussiness'];
    this.toastyObject = {title: 'Updating....', msg: 'Please wait', type: 'info'};
    this.commonService.toasty(this.toastyObject);

    this.userService.updateBussiness(Obj)
      .subscribe((data: any) => {
        this.toastyObject = {title: 'Success', msg: 'Bussiness Successfully Updated!', type: 'success'};
        this.commonService.toasty(this.toastyObject);
        this.getBussinessDetails();
        this.loadBranches();

      }, (err) => {
        this.toastyObject = {title: 'Oops!', msg: 'Something Went Wrong! Please Try Again...', type: 'error'};
        this.commonService.toasty(this.toastyObject);
      });
  }

  /**
   * Update the user details.
   */
  public userUpdate(): void {
    let Obj = this.user;

    Obj['image'] = this.images['user'];

    this.toastyObject = {title: 'Updating....', msg: 'Please wait', type: 'info'};
    this.commonService.toasty(this.toastyObject);

    this.userService.updateUser(Obj)
      .subscribe((data: any) => {
        this.toastyObject = {title: 'Success', msg: 'User Successfully Updated!', type: 'success'};
        this.commonService.toasty(this.toastyObject);
        this.getUserDetails();

        // TODO: Emit for header
      }, (err) => {
        this.toastyObject = {title: 'Oops!', msg: 'Something Went Wrong! Please Try Again...', type: 'error'};
        this.commonService.toasty(this.toastyObject);
      });
  }

  /**
   * Change the password.
   */
  public changePassword(): void {
    this.passMatch = true;
    this.authPass = true;
    this.loading = false;
    this.saveSuccess = false;

    console.log(this.userPass);
    if (this.userPass['new'] !== this.userPass['confirm'] || this.userPass['new'] === '' || this.userPass['new'] === this.userPass['old']) {
      this.passMatch = false;
      return;
    } else {
      this.loading = true;
      this.userService.changePass({
        password: this.userPass['old'],
        newPassword: this.userPass['new']
      }).subscribe((data) => {
        console.log(data);
        this.unauthorizeCount = 0;
        this.saveSuccess = true;
        this.userPass = {new: '', old: '', confirm: ''};
        setTimeout(() => {
          this.saveSuccess = false;
        }, 4000);

        this.loading = false;

      }, (err) => {
        this.authPass = false;
        this.unauthorizeCount++;
        this.loading = false;
        if (this.unauthorizeCount > 2) {
          console.log('Failed attempts 3. Logging out');
          this.userService.logout();
        }
      });
    }
  }

  /**
   * Load the map details.
   */
  public loadMap(): void {
    this.onCreateClick();
    setTimeout(() => {
      this.branchMap = true;
    }, 2000);

  }

  /**
   * Save the new branch details.
   */
  public branchSave(): void {
    this.toastyObject = {title: 'Saving....', msg: 'Please wait', type: 'info'};
    this.commonService.toasty(this.toastyObject);
    if (this.coords) {
      this.branch['lat'] = this.coords['lat'];
      this.branch['lng'] = this.coords['lng'];
    } else {
      this.branch['lat'] = this.lat;
      this.branch['lng'] = this.lng;
    }
    if (this.updateFlag) {
      this.userService.updateBranch(this.branch).subscribe((data) => {
        this.branchModal.hide();
        this.branchMap = false;
        this.toastyObject = {title: 'Updated', msg: 'Successfully Updated', type: 'success'};
        this.commonService.toasty(this.toastyObject);
        this.loadBranches();
      });

    } else {
      this.userService.saveBranch(this.branch).subscribe((data) => {
        this.branchModal.hide();
        this.branchMap = false;
        this.toastyObject = {title: 'Saved', msg: 'Successfully Saved', type: 'success'};
        this.commonService.toasty(this.toastyObject);
        this.loadBranches();
      });
    }
  }

  /**
   * Load the branch deatails.
   */
  public loadBranches(): void {
    this.userService.getBranches().subscribe((data) => {
      this.branchList = data;
      this.pinList = [];
      this.pinList.push({lat: this.lat, lng: this.lng});
      this.branchList.map((item) => {
        this.pinList.push({lat: parseFloat(item['lat']), lng: parseFloat(item['lng'])});
      });
    });
  }

  /**
   * Trigger this to show the confirmation to branch delete.
   * @param obj - branch details.
   */
  public onDelClick(obj): void {
    this.delObject = obj;
    this.delModal.show();
  }

  /**
   * Triggered when upadting the branch  details.
   * @param obj - branch details
   */
  public onUpdateClick(obj): void {
    obj['name'] = obj['branchname'];
    obj['lat'] = parseFloat(obj.lat);
    obj['lng'] = parseFloat(obj.lng);
    this.branch = obj;
    this.coords = undefined;
    this.updateFlag = true;
    this.branchModal.show();

    setTimeout(() => {
      this.branchMap = true;
    }, 2000);
  }

  /**
   * Triggered when creating branch.
   */
  public onCreateClick(): void {
    this.coords = undefined;
    this.updateFlag = false;
    this.branchModal.show();
  }

  /**
   * Delete the branch by sending an API request to REST API.
   */
  public deleteBranch(): void {
    this.userService.deleteBranch(this.delObject['id']).subscribe((data) => {
      this.delModal.hide();
      this.loadBranches();
      this.toastyObject = {title: 'Deleted', msg: 'Successfully Deleted', type: 'success'};
      this.commonService.toasty(this.toastyObject);
    });
  }

  /**
   * Get the last changed coordinates from the map.
   * @param event
   */
  public latChange(event): void {
    console.log(event);
    this.coords = event.coords;
  }
}
