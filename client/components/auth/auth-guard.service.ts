import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';
import * as $ from 'jquery';

@Injectable()
export class AuthGuard implements CanActivate {
    authService;
    router;
    static parameters = [AuthService, Router];
    constructor(authService: AuthService, router: Router) {
        this.authService = authService;
        this.router = router;
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        // console.log('route', route.url[0].path);
        const currentUser = this.authService.currentUserValue;
        if (currentUser) {
            return true;
        };

        this.authService.logout();

        // not logged in so redirect to login page 
        this.router.navigate(['/login']);
        return false;
    }



    // canActivate() {
    //     $('.tooltip.show').css('display', 'none');
    //     // console.log("localStorage.getItem('id_token')", localStorage.getItem('id_token'));
    //     // console.log("localStorage.getItem('user')", localStorage.getItem('user'));
    //     // console.log("this.authService.isLoggedIn()", this.authService.isLoggedIn());
    //     if (localStorage.getItem('id_token') && localStorage.getItem('user')) {
    //         // console.log("localstorageFound");
    //         return this.authService.isLoggedIn();
    //     }
    //     else {
    //         // console.log("localstoragenotfound");
    //         this.router.navigate(['/login']);
    //     }
    // }
    // //Change can activate to return a Promise
    // // canActivate(): Promise<boolean> {
    // //     return this.authService.isLoggedIn();
    // // }
}
