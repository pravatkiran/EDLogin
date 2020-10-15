import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';

import { AuthService } from '../components/auth/auth.service';
import { JwtInterceptor } from '../components/auth/jwt.interceptor';
import { AuthGuard } from '../components/auth/auth-guard.service';
import { LoginComponent } from './account/login/login.component';
import { HeaderComponent } from './header.component';
import { AppRoutingModule } from './app-routing-module';



@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        MainModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        AppRoutingModule
    ],
    exports: [BrowserModule],
    declarations: [
        AppComponent,
        LoginComponent,
        HeaderComponent,
    ],
    bootstrap: [AppComponent],
    providers: [
        AuthService,
        AuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ]
})
export class AppModule {

}
