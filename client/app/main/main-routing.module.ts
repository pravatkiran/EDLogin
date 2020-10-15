import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MainComponent } from "./main.component";
import { AuthGuard } from "../../components/auth/auth-guard.service";


const mainRoutes: Routes = [
    { path: 'home', component: MainComponent }
]
@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule]
})
export class MainRoutingModule {

}