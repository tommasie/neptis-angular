import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RegisterService} from '../services/register.service';
import {AuthenticationService} from '../services/authentication.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

    email: string;
    password: string;
    confirmPassword: string;

    organizations: object;
    organizzazione: object;

    regions: string[] = [];
    region: string = "Seleziona regione";
    cities: object = {};
    city: object;
    cityList: object[] = [];


  constructor(private service : RegisterService,
            private auth: AuthenticationService,
            private router: Router) { }

  ngOnInit() {
      this.loadCities();
      this.loadOrganizations();
  }

  loadOrganizations() {
      this.service.getOrganizations().subscribe(data => {
          this.organizations = data;
      })
  }

  loadCities() {
      this.service.getCitiesJSON().subscribe(data => {
          this.cities = data;
          Object.keys(data).forEach(region => {
              this.regions.push(region);
          });
          this.regions.sort();
      })
  }

  onRegionSelected(region) {
      this.cityList = this.cities[region];
  }

  verifyPassword(): boolean {
      return this.password == this.confirmPassword && this.confirmPassword !== "";

  }

  register(): void {
      console.log(this.region);
      console.log(this.city);
      console.log(this.email);
      this.auth.register({
          region: this.region,
          city: this.city['nome'],
          email: this.email,
          password:this.password
      });
  }



}

interface organizzazione {
    id: number;
    name: string;
}
