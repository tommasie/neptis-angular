import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ForbiddenInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .map((event: HttpEvent<any>) => {
            return event;
        })
        .catch((err: any, caught) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 403) {
                    this.router.navigate(['/login']);
                }
                return Observable.throw(err);
            }
        });
    }
}
