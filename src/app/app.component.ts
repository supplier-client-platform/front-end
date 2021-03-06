import { Component, ViewContainerRef } from '@angular/core';
import { UserService } from './shared/services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  private viewContainerRef: ViewContainerRef;
  title: string = 'App works! Supplier Client Angular2 App';
  selected: boolean = true;
  iconType: string = 'border';
  sizes: string[] = ['x-small', 'small', 'large'];

  public constructor(viewContainerRef: ViewContainerRef, private userService: UserService) {
    // You need this small hack in order to catch application root view container ref
    this.viewContainerRef = viewContainerRef;
    this.userService.setBussiness();

  }

  change() {
    this.selected = !this.selected;
    this.iconType = this.iconType === 'border' ? 'container' : 'border';
  }
}
