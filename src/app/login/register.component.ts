import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

    loading = false;

    organizations: object;
    organizzazione: object;

    regions: string[] = [];
    cities: object = {};
    cityList: object[] = [];

    registerForm: FormGroup;
    pattern = '^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9_]+)$';

    constructor(private service: RegisterService,
        private auth: AuthenticationService,
        private router: Router,
        private fb: FormBuilder) { }

    ngOnInit() {
        this.loadCities();
        this.loadOrganizations();
        this.registerForm = this.fb.group({
            region: ['', Validators.required],
            city: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6),
                Validators.pattern(this.pattern)]],
            passwordConfirm: ['', [Validators.required, Validators.minLength(6),
                Validators.pattern(this.pattern)]],
        }, {validator: this.passwordMatchValidator});
    }

    private passwordMatchValidator(g: FormGroup) {
        return g.get('password').value === g.get('passwordConfirm').value
           ? null : {'mismatch': true};
     }

    loadOrganizations() {
        this.service.getOrganizations().subscribe(data => {
            this.organizations = data;
        });
    }

    loadCities() {
        this.service.getCitiesJSON().subscribe(data => {
            this.cities = data;
            Object.keys(data).forEach(region => {
                this.regions.push(region);
            });
            this.regions.sort();
        });
    }

    onRegionSelected(region) {
        console.log(region);
        this.cityList = this.cities[region];
    }

    onCitySelected(city) {
        console.log(city);
    }

    register(): void {
        const model = this.registerForm.value;
        console.log(model);
        this.auth.register({
            region: model.region,
            city: model.city.nome,
            email: model.email,
            password: model.password
        });
    }
}

interface IOrganizzazione {
    id: number;
    name: string;
}
