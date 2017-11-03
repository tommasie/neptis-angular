import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {UserService} from './user.service';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthenticationService {

    subject = new Subject<boolean>();
    private url = environment.apiUrl;
    token : string;

    constructor(private http: HttpClient,
        private auth: AngularFireAuth,
        private router: Router,
        private userService: UserService)  {
        }

        login2(email: string, password:string) {
            this.auth.auth.signInWithEmailAndPassword(email, password)
            .then(user => {
                return user.getIdToken();
            })
            .then(token => {
                this.userService.setToken(token);
                this.router.navigate(['/home']);
            }).catch(err => {
                console.log(err);
            });
        }

        logout(): void {
            this.auth.auth.signOut()
            .then(() => {
                this.router.navigate(['/login']);
            }).catch(err => {
                console.log(err);
            })
        }

        register(data: object) {
            this.auth.auth.createUserWithEmailAndPassword(data['email'], data['password'])
            .then(user => {
                return user.getIdToken();
            })
            .then(token => {
                this.userService.setToken(token);
                this.http.post(this.url + 'register', data)
                .subscribe(data => {
                    this.router.navigate(['/home']);
                }, error => console.log(error));
            })
            .catch(err => {
                console.log(err);
            });

        }
    }
