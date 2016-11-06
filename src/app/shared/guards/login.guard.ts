import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UserService } from '../services/user.service';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (!this.userService.isAuthorized()) {
            this.router.navigate(['/', 'login']);
            return false;
        }
        return true;
    }

}
