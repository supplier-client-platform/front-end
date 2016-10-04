import { Component, OnInit } from '@angular/core';
import { DropzoneConfigInterface } from 'angular2-dropzone-wrapper';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private config: DropzoneConfigInterface = {
    params: "name=test.png&directory=images"
  };

  private uploadedImages = [];



  onUploadDone(event: any) {
    console.log('onUploadDone:', event);
  }

  onUploadError(event: any) {
    console.log('onUploadError:', event);
  }


}
