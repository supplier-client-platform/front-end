import { Component, OnInit } from '@angular/core';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { CommonService } from '../../../shared/services/common.service';
import { UserService } from '../../../shared/services/user.service';
import { IToastyObject } from '../../../shared/models/common.model';
import { UPDATE_BUSSINESS, UserState } from '../../../shared/reducers/user.reducer';

@Component({
  selector: 'app-bussiness',
  templateUrl: './bussiness.component.html',
  styleUrls: ['./bussiness.component.scss']
})
export class BussinessComponent implements OnInit {

  toastyObject: IToastyObject;

  user: Object = {};
  bussiness: Object = {};
  bussinessAdress: Object = {};
  bussinessAdressEdit: String;
  categories: Array<Object> = [];
  cities: Array<Object> = [];

  userView: Object = {};
  bussinessView: Object = {};

  title: string = '';
  lat: number;
  lng: number;

  userInfoLoading: boolean = true;
  bussinessInfoLoading: boolean = true;

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

  selected(imageResult: ImageResult, type) {

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


  constructor(private commonService: CommonService, private userService: UserService) {
    this.getUserDetails();
    this.getBussinessDetails();
    this.getCategories();
    this.getCities();
  }

  ngOnInit() {
  }


  getUserDetails() {
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

  getBussinessDetails() {
    this.userService.userInfo.subscribe((data: UserState) => {
      this.bussiness = data.bussiness;
      console.log(data , this.bussiness['address']);
      if (Object.getOwnPropertyNames(this.bussiness).length > 0) {
        this.bussinessView = <Object>JSON.parse(JSON.stringify(this.bussiness));

        this.bussinessAdress = JSON.parse(this.bussiness['address']);
        this.bussinessAdressEdit = this.bussinessAdress['address'];
        this.title = this.bussiness['name'];
        this.lat = parseFloat(this.bussinessAdress['latitude']);
        this.lng = parseFloat(this.bussinessAdress['longitude']);
        this.map = true;
        this.bussinessInfoLoading = false;

        if (this.bussiness['image'] !== null && this.bussiness['image'] !== '') {
          this.images['bussiness'] = this.bussiness['image'];
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  getCategories() {
    this.userService.getBussinessCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  getCities() {
    this.userService.getCities().subscribe((data) => {
      this.cities = data;
    });
  }

  bussinessUpdate() {

    let Obj = this.bussiness;
    // build address
    Obj['address'] = JSON.stringify({
      address: this.bussinessAdressEdit,
      latitude: this.lat,
      longitude: this.lng
    });

    // parse Image
    Obj['image'] = this.images['bussiness'];
    this.toastyObject = { title: 'Updating....', msg: 'Please wait', type: 'info' };
    this.commonService.toasty(this.toastyObject);

    this.userService.updateBussiness(Obj)
      .subscribe((data: any) => {
        this.toastyObject = { title: 'Success', msg: 'Bussiness Successfully Updated!', type: 'success' };
        this.commonService.toasty(this.toastyObject);
        this.getBussinessDetails();

        // TODO: Emit for header
      }, (err) => {
        this.toastyObject = { title: 'Oops!', msg: 'Something Went Wrong! Please Try Again...', type: 'error' };
        this.commonService.toasty(this.toastyObject);
      });
  }


  userUpdate() {
    let Obj = this.user;

    Obj['image'] = this.images['user'];

    this.toastyObject = { title: 'Updating....', msg: 'Please wait', type: 'info' };
    this.commonService.toasty(this.toastyObject);

    this.userService.updateUser(Obj)
      .subscribe((data: any) => {
        this.toastyObject = { title: 'Success', msg: 'User Successfully Updated!', type: 'success' };
        this.commonService.toasty(this.toastyObject);
        this.getUserDetails();

        // TODO: Emit for header
      }, (err) => {
        this.toastyObject = { title: 'Oops!', msg: 'Something Went Wrong! Please Try Again...', type: 'error' };
        this.commonService.toasty(this.toastyObject);
      });
  }

}
