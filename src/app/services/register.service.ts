import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Observable} from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class RegisterService {

    constructor(private http: HttpClient)  {
    }

    getCitiesJSON(): Observable<Object> {
        return this.http.get('http://localhost:9070/auth/comuni');
    }

    getOrganizations(): Observable<Object> {
        return this.http.get('http://localhost:9070/auth/organizzazioni');
    }
}
