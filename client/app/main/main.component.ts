import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../../components/auth/auth.service';

interface DrillInfo {
    text: string;
    node?: any;
}

@Component({
    selector: 'main',
    template: require('./main.html'),
    styles: [` `]
})


export class MainComponent implements OnInit {



    static parameters = [HttpClient, AuthService];



    constructor(private http: HttpClient,
        private auth: AuthService) {
        this.http = http;

    }


    ngOnInit() {

    }

}
