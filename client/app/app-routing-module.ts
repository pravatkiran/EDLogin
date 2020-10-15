import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./account/login/login.component";


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '**',
        redirectTo: '/login',
        pathMatch: 'full'
    }
]
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}