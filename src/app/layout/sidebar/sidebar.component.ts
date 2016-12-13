import { CommonService } from './../../shared/services/common.service';
import { DashboardService } from './../../shared/services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { UPDATE_BUSSINESS, UserState } from '../../shared/reducers/user.reducer';
import { IToastyObject } from '../../shared/models/common.model';

declare var Pusher: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  bussiness: Object;
  sidebar: Object = {};
  pusher: any;
  channel: any;
  public toastyObject: IToastyObject;

  constructor(private userService: UserService, private router: Router, private dashboardService: DashboardService,
    private commonService: CommonService) {

    this.getBussiness();
    this.getSidebar();

    this.pusher = new Pusher('20b67caf4dad6ad7ae0d');
    this.channel = this.pusher.subscribe('order');
    console.log(this.channel);
    this.channel.bind('order_web_notifications' + userService.supplierID, function (data) {
      console.log("pusher", data);
      this.toastyObject = { title: 'New Notification!', msg: 'You have recieved 1 New Order', type: 'info' };
      this.commonService.toasty(this.toastyObject);
      this.getSidebar();
    }.bind(this));

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

  getSidebar() {
    this.dashboardService.getSidebar().subscribe((data) => {
      this.sidebar = data.data;
      console.log(this.sidebar);
    });
  }



}
