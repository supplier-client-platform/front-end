import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import {NglModule, provideNglConfig} from 'ng-lightning/ng-lightning';
import { AppComponent }  from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NglModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [provideNglConfig({'svgPath': './icons'})],
  bootstrap: [AppComponent]
})

export class AppModule { }


