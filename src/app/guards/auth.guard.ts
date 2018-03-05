import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import 'rxjs/add/operator/toPromise';
import {AngularFireAuth} from 'angularfire2/auth';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        private auth: AuthenticationService,
        private firebase: AngularFireAuth) {}

        canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
            return new Promise<boolean>((resolve, reject) => {
                //TODO
                //resolve(true);
                // let user = this.firebase.auth.currentUser;
                this.firebase.authState.subscribe(user => {
                    if(user != null) {
                        resolve(true);
                    } else {
                        this.router.navigate(['/login']);
                        resolve(false);
                    }
                });
            });
        }
    }
