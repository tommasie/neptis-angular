import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'

import * as CryptoJS from 'crypto-js';

@Injectable()
export class AuthenticationService {

  subject = new Subject<boolean>();

  constructor(private http: HttpClient)  {
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:9070/auth/admin', {email:email, password:password});
  }

  logout(): void {
    localStorage.removeItem('curatoreCorrente');
    this.subject.next(false);
  }

  getStatus(): Observable<any> {
    return this.subject.asObservable();
  }

  encryptPassword(password: string) : string {
    let crypt = CryptoJS.SHA3(password).toString();
    return crypt;
  }

  getToken() {
      return JSON.parse(localStorage.getItem('curatoreCorrente')).token;
  }

  register(data: object): Observable<any> {
      return this.http.post('http://localhost:9070/auth/register/admin', data);
  }
}
