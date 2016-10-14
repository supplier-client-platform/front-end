import { Component, OnInit } from '@angular/core';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';


interface CustomAttrib {
  label: string;
  value: string;
}

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {


  src: string = '';
  resizeOptions: ResizeOptions = {
    resizeMaxHeight: 175,
    resizeMaxWidth: 175
  };

  customAttribIndex: number = 0;
  customAtribs: Array<CustomAttrib> = [
    {
      label: '',
      value: ''
    }
  ];

  selected(imageResult: ImageResult) {
    this.src = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
  }

  constructor() { }

  ngOnInit() {
  }

  detectChange(id) {
    console.log(id);
    if ((this.customAtribs.length - 1) === id) {
      console.log('came here 1', this.customAtribs[id].label, this.customAtribs[id].value);
      if (this.customAtribs[id].label.trim() !== '' && this.customAtribs[id].value.trim() !== '') {
        this.customAtribs.push(
          {
            label: '',
            value: ''
          }
        );

        console.log('came here 2');
      }

    }
  }



}
