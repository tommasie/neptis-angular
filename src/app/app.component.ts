import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';

import {AngularFireAuth} from 'angularfire2/auth';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {

    logged: boolean;
    username: string;

    constructor(private auth: AuthenticationService, private router: Router, private firebase: AngularFireAuth) {
        this.firebase.authState.subscribe(user => {
            if(user == null) {
                this.logged = false;
            } else {
                this.username = user.email;
                this.logged = true;
            }
        });
    }

    logout(): void {
        this.auth.logout();
        this.router.navigate(['/login']);
    }
}
