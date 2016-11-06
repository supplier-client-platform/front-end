import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  img: string = '';
  constructor(private userService: UserService, private router: Router) {

    this.getBussiness();
  }

  ngOnInit() {
  }

  logout() {

    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }

  getBussiness() {
    this.userService.getBussinessDetails()
      .subscribe((data) => {
        this.img = data.data[0].image;
      });
  }


}
