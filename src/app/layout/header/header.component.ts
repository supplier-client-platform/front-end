import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { UPDATE_USER, UserState } from '../../shared/reducers/user.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

/**
 * Class representing an header component.
 */
export class HeaderComponent implements OnInit {

  user: Object = {};
  constructor(private userService: UserService) {
    this.getUser();
  }

  ngOnInit() {
  }

  /**
   * Function to subscribe the user info from the user service.
   */
  subscribe() {
    this.userService.userInfo
      .subscribe((data: UserState) => {
        this.user = data.user;
      });
  }

  /**
   * Function to get the user details from the REST API.
   */
  getUser() {
    this.userService.getUserDetails()
      .subscribe((data) => {
        this.userService.dispatch(UPDATE_USER, data.data);
        this.subscribe();
      });
  }

}
