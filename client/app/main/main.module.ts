import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { CommonModule } from '@angular/common';

import { DevExtremeModule } from 'devextreme-angular';




import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';

// import { LicenseManager } from 'ag-grid-enterprise';
// LicenseManager.setLicenseKey("OrderGenie_Synergy_Pvt_Ltd__MultiApp_1Devs_1Deployment_20_March_2020__MTU4NDY2MjQwMDAwMA==9f63ad49a34547b9b056cce9fe224840")





@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MainRoutingModule,
        DevExtremeModule

    ],
    declarations: [

        MainComponent
    ],
    
})
export class MainModule { }
