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
      let pw = this.auth.encryptPassword(this.password);
      this.auth.login(this.email, pw)
        .subscribe(data => {
            this.loading = false;
            let token = data['token'];
            if(token) {
              localStorage.setItem('curatoreCorrente',JSON.stringify(data));
            }
            this.auth.subject.next(true);
            this.router.navigate(['/home']);
        }, error => {
            console.log(error);
        });
  }

  isValid(): boolean {
      return this.email.length > 0 && this.password.length > 0;
  }

}
