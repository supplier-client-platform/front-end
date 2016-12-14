import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Class representing a Login Component.
 */
export class LoginComponent implements OnInit {

  error: boolean = false;
  loading: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  /**
   * Function used to login.
   * @param username - username of the current logging user.
   * @param pass - password of the current logging user.
   */
  login(username, pass) {
    this.loading = true;
    this.error = false;
    this.userService.login({ email: username, password: pass })
      .subscribe((data) => {
        // this.loading = false;
        console.log(data);
        this.userService.saveToken(data.data['token'], data.data['id']);
        this.getSupplier();
      }, (err) => {
        this.error = true;
        this.loading = false;
      });

  }

  /**
   * Get the supplier details from the REST API using user service.
   */
  getSupplier() {
    this.userService.getBussinessDetails()
      .subscribe((data) => {
        console.log(data);
        this.userService.saveBussiness(data.data[0].id);
        this.router.navigate(['/', 'dashboard']);
      });
  }

}
