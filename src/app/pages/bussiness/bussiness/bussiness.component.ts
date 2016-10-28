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

  title: string = '';
  lat: number;
  lng: number;

  map: boolean = false;



  src: string = '';
  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 175,
    resizeMaxWidth: 175
  };

  selected(imageResult: ImageResult) {
    this.src = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
  }


  constructor(private commonService: CommonService, private userService: UserService) {
    this.getUserDetails();
    this.getBussinessDetails();
  }

  ngOnInit() {
  }


  getUserDetails() {
    this.userService.getUserDetails().subscribe((data) => {
      console.log(data);
      this.user = data.data;
    }, (err) => {
      console.log(err);
    });
  }

  getBussinessDetails() {
    this.userService.getBussinessDetails().subscribe((data) => {
      console.log(data);
      this.bussiness = data.data[0];
      this.bussinessAdress = JSON.parse(this.bussiness['address']);
      this.title = this.bussiness['name'];
      this.lat = parseFloat(this.bussinessAdress['latitude']);
      this.lng = parseFloat(this.bussinessAdress['longitude']);
      this.map = true;
      console.log(this.lat, this.lng);
    }, (err) => {
      console.log(err);
    });
  }



}
