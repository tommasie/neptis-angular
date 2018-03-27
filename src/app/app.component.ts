import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { NotificationService } from './services/notification.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {

    logged: boolean;
    username: string;

    notificationMsg: string;
    notificationType: string;

    constructor(private auth: AuthenticationService,
        private router: Router,
        private firebase: AngularFireAuth,
        public notification: NotificationService) {
        this.firebase.authState.subscribe(user => {
            if (user != null && user.emailVerified) {
                this.username = user.email;
                this.logged = true;
            } else {
                this.logged = false;
            }
        });

        this.notification.subject.subscribe(data => {
            this.notificationMsg = data.message;
            this.notificationType = data.type;
        });
    }

    logout(): void {
        this.auth.logout()
        .then(() => {
            this.router.navigate(['/login']);
        }).catch(err => {
            console.log(err);
        });
    }
}
