import { Component, OnInit } from '@angular/core';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';


 

@Component({
  selector: 'app-bussiness',
  templateUrl: './bussiness.component.html',
  styleUrls: ['./bussiness.component.scss']
})
export class BussinessComponent implements OnInit {

  title: string = 'My first angular2-google-maps project';
  lat: number = 51.678418;
  lng: number = 7.809007;
  public address: Object;

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


  constructor() { }

  ngOnInit() {
  }

  getAddress(place: Object) {
    this.address = place['formatted_address'];
    let location = place['geometry']['location'];
    let lat = location.lat();
    let lng = location.lng();
    console.log('Address Object', place, lat, lng);
  }

}
