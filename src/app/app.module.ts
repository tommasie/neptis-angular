import { BrowserModule }        from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule }             from '@angular/core';
import { FormsModule }          from '@angular/forms';
import {HttpClientModule}       from '@angular/common/http';
import { RoutingModule }        from './routing.module';
import { AngularFireModule }    from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {HTTP_INTERCEPTORS}      from '@angular/common/http';
import {TokenInterceptor}   from './interceptors/token.interceptor';
import { AgmCoreModule }        from '@agm/core';
import { AlertModule } from 'ngx-bootstrap/alert';

import { AppComponent }         from './app.component';
import {AuthenticationService}  from './services/authentication.service';
import {UserService}           from './services/user.service';
import {AuthGuard}              from './guards/auth.guard';
import {NotificationService}    from './services/notification.service';
import {LoginModule}            from './login/login.module';
import {AdminModule}            from './admin/admin.module';
import {AttractionModule}       from './admin/attractions/attraction.module';
import {MuseumModule}           from './admin/museums/museum.module';
import {environment}            from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyAqY3G_iymwda5bn9g87a4YwDPWu13gnw0'}),
    LoginModule,
    AdminModule,
    AttractionModule,
    MuseumModule,
    RoutingModule,
  ],
  providers: [AuthenticationService,
            AuthGuard,
            UserService,
            NotificationService,
            [{
                provide: HTTP_INTERCEPTORS,
                useClass: TokenInterceptor,
                multi: true,
            }]
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
