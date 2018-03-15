import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  email: string;
  password: string;
  loading = false;

  loginForm: FormGroup;

  constructor(private auth: AuthenticationService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  click(): void {
    const model = this.loginForm.value;
    this.loading = true;
    this.auth.login2(model.email, model.password)
      .then(() => {
        this.loading = false;
        this.router.navigate(['/home']);
      })
      .catch(err => {
        console.log(err);
        this.loading = false;
      });
  }

}
