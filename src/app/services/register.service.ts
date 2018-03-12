import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class RegisterService {

    private url = environment.unprotectedUrl;
    constructor(private http: HttpClient) {
    }

    getCitiesJSON(): Observable<Object> {
        return this.http.get(this.url + 'auth/comuni');
    }

    getOrganizations(): Observable<Object> {
        return this.http.get(this.url + 'auth/organizzazioni');
    }
}
