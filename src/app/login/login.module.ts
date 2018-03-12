// Core modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap/alert';
// Components
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

// Routes
import { LoginRoutingModule } from './login-routing.module';
import { AuthenticationService } from '../services/authentication.service';
import { RegisterService } from '../services/register.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    LoginRoutingModule,
  ],
  providers: [AuthenticationService, RegisterService]
})

export class LoginModule { }
