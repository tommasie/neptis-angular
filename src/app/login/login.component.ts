import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    email: string;
    password: string;
    loading = false;

  constructor(private auth: AuthenticationService, private router: Router) {
    }

  ngOnInit() {
  }

  click(): void {
      this.loading = true;
      this.auth.login2(this.email, this.password);
  }

  isValid(): boolean {
      return this.email.length > 0 && this.password.length > 0;
  }

}
