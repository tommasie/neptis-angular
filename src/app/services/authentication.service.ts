import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'

import * as CryptoJS from 'crypto-js';

@Injectable()
export class AuthenticationService {
  public token: string;
  isLoggedIn = false;
  response: any;

  private subject = new Subject<boolean>();

  constructor(private http: HttpClient)  {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(email: string, password: string): Observable<any> {
    this.isLoggedIn = true;
    this.subject.next(true);
    return this.http.post('http://localhost:9070/admin_login', {email:email, password:password})
      .map((response: Response) => {
        console.log(response);
        let token = response['token'];
        if(token) {
          this.token = token;
          localStorage.setItem('currentUser',JSON.stringify({ email: email, token: token }));
        }
      });
  }

  logout(): void {
    this.isLoggedIn = false;
    this.subject.next(false);
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  getStatus(): Observable<any> {
    return this.subject.asObservable();
  }

  encryptPassword(password: string) : string {
    let crypt = CryptoJS.SHA3(password).toString();
    return crypt;
  }
}
