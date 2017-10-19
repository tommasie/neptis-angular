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
    valid: boolean = true;
    loading = false;
    returnUrl: string;

  constructor(private auth: AuthenticationService, private router: Router) {
    }

  ngOnInit() {
  }


  click(): void {
      this.loading = true;
      console.log(this.email + " " + this.password);
      let pw = this.auth.encryptPassword(this.password);
      console.log(this.email + " " + pw);
      this.auth.login(this.email, pw)
        .subscribe(data => {this.router.navigate(['/home'])}, error => console.log(error));
  }

  isValid(): boolean {
      return this.email.length > 0 && this.password.length > 0;
  }

}
