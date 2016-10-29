import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: Object = {};
  constructor(private userService: UserService) {
    this.getUser();
  }

  ngOnInit() {
  }



  // items = [
  //   { value: 'Logout', icon: 'power', url: 'login' }
  // ];

  // onToggle($event: Event) {
  //   $event.stopPropagation();
  //   this.open = true;
  // }

  getUser() {
    this.userService.getUserDetails()
      .subscribe((data) => {
        this.user = data.data;
        console.log(data);
      });
  }

}
