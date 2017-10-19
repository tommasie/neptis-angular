import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

    email: string;
    password: string;
    confirmPassword: string;


  constructor() { }

  ngOnInit() {
  }

  verifyPassword(): boolean {
      return this.password == this.confirmPassword && this.password !== "";
  }

  register(): void {
      if(!this.verifyPassword())
        return;

  }

}
