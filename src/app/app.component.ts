import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {

    logged: boolean;
    username: string;

    constructor(private auth: AuthenticationService, private router: Router) {

        this.auth.getStatus().subscribe(value => {
            this.logged = value;
            if(localStorage.getItem('curatoreCorrente') != undefined) {
                this.username = JSON.parse(localStorage.getItem('curatoreCorrente')).email;
            }
        });
    }

    logout(): void {
        this.auth.logout();
        this.router.navigate(['/login']);
    }
}
