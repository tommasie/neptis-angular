import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class UserService {

    private token: string;
    private email: string;

    constructor(private firebase: AngularFireAuth) {
        this.firebase.authState.subscribe(user => {
            if(user) {
                user.getIdToken().then(token => {
                    this.token = token;
                    this.email = user.email;
                });
            } else {
                this.token = null;
                this.email = null;
            }
        });
    }

    getToken() {return this.token;}

    setToken(token) {this.token = token;}

    getEmail() {return this.email;}

    setEmail(email) {this.email = email;}
}
