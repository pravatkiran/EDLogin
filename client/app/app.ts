import './app.css';
// import '../assets/fonts/entero/font-style.css';
import 'bootstrap';
// import './polyfills';
import 'core-js/es7/reflect';
// import * as $ from 'jquery';
import '@ng-bootstrap/ng-bootstrap';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import '../../node_modules/jquery/dist/jquery';
// import '../assets/Lightweight-Drilldown-Menu-Plugin-with-jQuery-Bootstrap/js/bootstrap-drilldown-select';
// depending on the env mode, enable prod mode or add debugging modules
if (process.env.NODE_ENV === 'production') {
    enableProdMode();
}

import { AppModule } from './app.module';

export function main() {
    return platformBrowserDynamic().bootstrapModule(AppModule);
}

if (document.readyState === 'complete') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}


