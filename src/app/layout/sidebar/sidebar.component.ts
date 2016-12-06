import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { UPDATE_BUSSINESS, UserState } from '../../shared/reducers/user.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  bussiness: Object;
  constructor(private userService: UserService, private router: Router) {

    this.getBussiness();


  }

  ngOnInit() {
  }

  logout() {

    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }

  subscribe() {
    this.userService.userInfo
      .subscribe((data: UserState) => {
        this.bussiness = data.bussiness;
      });
  }

  getBussiness() {
    this.userService.getBussinessDetails()
      .subscribe((data) => {
        this.userService.dispatch(UPDATE_BUSSINESS, data.data[0]);
        this.subscribe();
      });
  }




}
