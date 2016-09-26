import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import {NglModule, provideNglConfig} from 'ng-lightning/ng-lightning';
import { AppComponent }  from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NglModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent
  ],
  providers: [provideNglConfig({'svgPath': './icons'})],
  bootstrap: [AppComponent]
})

export class AppModule { }


