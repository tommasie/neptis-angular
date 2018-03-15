import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { UserService } from './user.service';
import { NotificationService } from './notification.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

    subject = new Subject<boolean>();
    private url = environment.apiUrl;
    token: string;

    constructor(private http: HttpClient,
        private angularFirebase: AngularFireAuth,
        private router: Router,
        private userService: UserService,
        private notification: NotificationService) {
    }

    login(email: string, password: string) {
        this.angularFirebase.auth.signInWithEmailAndPassword(email, password)
            .then((user: firebase.User) => {
                return user.getIdToken();
            })
            .then((token: string) => {
                this.userService.setToken(token);
                this.router.navigate(['/home']);
            }).catch(err => {
                const code = err.code;
                this.notification.push({
                    isOpen: true,
                    type: 'danger',
                    message: this.manageError(code)
                });
                console.log(err);
            });
    }

    login2(email: string, password: string): Promise<any> {
        return this.angularFirebase.auth.signInWithEmailAndPassword(email, password)
            .then((user: firebase.User) => {
                if (user.emailVerified) {
                    return user.getIdToken();
                } else {
                    return Promise.reject({code: 'auth/unverified-email'});
                }
            })
            .then((token: string) => {
                this.userService.setToken(token);
                return Promise.resolve();
            }).catch(err => {
                const code = err.code;
                this.notification.push({
                    isOpen: true,
                    type: 'danger',
                    message: this.manageError(code)
                });
                console.log(err);
                return Promise.reject({message: 'errore'});
            });
    }

    logout(): void {
        this.angularFirebase.auth.signOut()
            .then(() => {
                this.router.navigate(['/login']);
            }).catch(err => {
                console.log(err);
            });
    }

    register(data: object) {
        this.angularFirebase.auth.createUserWithEmailAndPassword(data['email'], data['password'])
            .then((user: firebase.User) => {
                return user.getIdToken();
            })
            .then((token: string) => {
                this.userService.setToken(token);
                this.http.post(this.url + 'register', data)
                    .subscribe(response => {
                        this.router.navigate(['/home']);
                    }, error => console.log(error));
            })
            .catch(err => {
                const code = err.code;
                this.notification.push({
                    isOpen: true,
                    type: 'danger',
                    message: this.manageError(code)
                });
                console.log(err);
            });

    }

    register2(data: object) {
        this.angularFirebase.auth.createUserWithEmailAndPassword(data['email'], data['password'])
            .then((user: firebase.User) => {
                return user.sendEmailVerification({
                    // url: 'https://neptis-poleis.diag.uniroma1.it:9070/'
                    url: 'http://localhost:9070'
                });
            })
            .catch(err => {
                const code = err.code;
                this.notification.push({
                    isOpen: true,
                    type: 'danger',
                    message: this.manageError(code)
                });
                console.log(err);
            });

    }

    manageError(error: string): string {
        switch (error) {
            case 'auth/wrong-password':
                return '<strong>Password errata</strong>';
            case 'auth/invalid-email':
                return '<strong>Email non valida</strong>';
            case 'auth/user-not-found':
                return '<strong>Utente non trovato</strong>';
            case 'auth/user-disabled':
                return '<strong>Utente disabilitato</strong>';
            case 'auth/email-already-in-use':
                return '<strong>Email già utilizzata</strong>';
            case 'auth/weak-password':
                return '<strong>Password troppo debole</strong>';
            case 'auth/unverified-email':
                return '<strong>Email non verificata</strong>';
            case 'auth/invalid-continue-uri':
                return '<strong>The continue URL provided in the request is invalid</strong>';
            case 'auth/unauthorized-continue-uri':
                return 'The domain of the continue URL is not whitelisted. Whitelist the domain in the Firebase console.';
        }
    }
}
