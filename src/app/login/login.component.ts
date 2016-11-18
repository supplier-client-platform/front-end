import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: boolean = false;
  loading: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

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

  getSupplier() {
    this.userService.getBussinessDetails()
      .subscribe((data) => {
        console.log(data);
        this.userService.saveBussiness(data.data[0].id);
        this.router.navigate(['/', 'product']);
      });
  }

}
