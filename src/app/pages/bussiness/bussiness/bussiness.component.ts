import { Component, OnInit } from '@angular/core';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { CommonService } from '../../../shared/services/common.service';
import { UserService } from '../../../shared/services/user.service';
import { IToastyObject } from '../../../shared/interfaces/common.interfaces';



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

  map: boolean = false;

  images: Object = {
    bussiness: 'http://www.maxtechagency.com/img/team/no-image-available.jpg',
    user: 'http://www.maxtechagency.com/img/team/no-image-available.jpg'
  };

  src: string = '';
  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 175,
    resizeMaxWidth: 175
  };

  selected(imageResult: ImageResult, type) {

    if (type === 'bussiness') {
      this.images['bussiness'] = imageResult.resized
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
    this.userService.getUserDetails().subscribe((data) => {
      console.log(data);
      this.user = data.data;
      this.userView = <Object>JSON.parse(JSON.stringify(this.user));
    }, (err) => {
      console.log(err);
    });
  }

  getBussinessDetails() {
    this.userService.getBussinessDetails().subscribe((data) => {
      console.log(data);
      this.bussiness = data.data[0];
      this.bussinessView = <Object>JSON.parse(JSON.stringify(this.bussiness));

      this.bussinessAdress = JSON.parse(this.bussiness['address']);
      this.bussinessAdressEdit = this.bussinessAdress['address'];
      this.title = this.bussiness['name'];
      this.lat = parseFloat(this.bussinessAdress['latitude']);
      this.lng = parseFloat(this.bussinessAdress['longitude']);
      this.map = true;

      if (this.bussiness['image'] !== null && this.bussiness['image'] !== '') {
        this.images['bussiness'] = this.bussiness['image'];
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
      lat: this.lat,
      lng: this.lng
    });

    // parse Image 
    Obj['image'] = this.images['bussiness'];
    this.toastyObject = { title: 'Updating....', msg: 'Please wait', type: 'info' };
    this.commonService.toasty(this.toastyObject);

    console.log(Obj);
    this.userService.updateBussiness(Obj)
      .subscribe((data: any) => {
        this.toastyObject = { title: 'Success', msg: 'Product Successfully Updated!', type: 'success' };
        this.commonService.toasty(this.toastyObject);
        this.getBussinessDetails();
      }, (err) => {
        this.toastyObject = { title: 'Oops!', msg: 'Something Went Wrong! Please Try Again...', type: 'error' };
        this.commonService.toasty(this.toastyObject);
      });
  }

}
