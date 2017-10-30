import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { FormsModule }          from '@angular/forms';
import {HttpClientModule}       from '@angular/common/http';
import { JwtModule }            from '@auth0/angular-jwt';
import { RoutingModule }        from './routing.module';
import {HTTP_INTERCEPTORS}      from '@angular/common/http';
import {ForbiddenInterceptor}   from './interceptors/forbidden.interceptor';
import { AgmCoreModule }        from '@agm/core';

import { AppComponent }         from './app.component';
import {AuthenticationService}  from './services/authentication.service';
import {AuthGuard}              from './guards/auth.guard';

import {LoginModule}            from './login/login.module';
import {AdminModule}            from './admin/admin.module';
import {AttractionModule}       from './admin/attractions/attraction.module';
import {MuseumModule}           from './admin/museums/museum.module';

export function tokenGetter() {
    if(localStorage.getItem('curatoreCorrente')) {
        return JSON.parse(localStorage.getItem('curatoreCorrente')).token;
    }
    return null;
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:9070']
      }
  }),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyAqY3G_iymwda5bn9g87a4YwDPWu13gnw0'}),
    LoginModule,
    AdminModule,
    AttractionModule,
    MuseumModule,
    RoutingModule,
  ],
  providers: [AuthenticationService,
            AuthGuard,
            [{
                provide: HTTP_INTERCEPTORS,
                useClass: ForbiddenInterceptor,
                multi: true,
            }]
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
