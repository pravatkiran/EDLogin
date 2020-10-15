import { Component, OnInit } from '@angular/core';
import { AuthService } from '../components/auth/auth.service';

@Component({
  selector: 'app',
  template: require('./app.component.html')
})

export class AppComponent implements OnInit {
  constructor(
  ) { }

  ngOnInit() {
   
  }
}