import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  logged: boolean;
  subscription: Subscription;
  username: string;

  constructor(private auth: AuthenticationService, private router: Router) {
      this.auth.getStatus().subscribe(value => {
        this.logged = value;
        //this.username = JSON.parse(localStorage.getItem('currentUser')).email;
      });
  }

  click(): void {
    this.auth.logout();
    this.auth.getStatus().subscribe(value => {this.logged = value});
    this.router.navigate(['/login']);
  }
}
