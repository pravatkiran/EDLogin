import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../components/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-login',
    template: require('./login.html'),
    styles: [require('./login.component.css')],
})
export class LoginComponent implements OnInit {
    public navbar: boolean = false;
    AuthService;
    isLoggedIn;
    Router;

    login_form = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
    customerId: any;
    userId: any;
    customers: any;
    closeResult: string;

    get f() {
        return this.login_form.controls;
    }

    static parameters = [AuthService, Router, HttpClient];
    constructor(
        private authService: AuthService,
        private router: Router,
        private http: HttpClient,
    ) { }




    ngOnInit() {

    }


    loginUser() {
        console.log('user', this.login_form.value);
        this.authService.login(this.login_form.value).subscribe((res: any) => {
            console.log('response', res);
        })
    }


}
