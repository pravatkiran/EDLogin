import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {

    static parameters = [HttpClient, Router]
    constructor(
        private http: HttpClient,
        private router: Router,
    ) { }

    public get currentUserValue() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }


    login(data: any) {
        return this.http.post('/auth/local', data);
    }

    logout() {
       
        localStorage.removeItem('access_token');
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('customerId');
        sessionStorage.removeItem('enteroInit');
        sessionStorage.removeItem('home');
    }

    public get loggedIn(): boolean {
        return (localStorage.getItem('access_token') !== null);
    }

}
