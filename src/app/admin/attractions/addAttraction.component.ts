import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AttractionService } from '../../services/attraction.service';
import { Attraction } from '../../model/attraction';

@Component({
    selector: 'app-admin-add-attraction',
    templateUrl: './addAttraction.component.html',
    styleUrls: ['./attractions.component.css']
})

export class AddAttractionComponent implements OnInit {

    attraction: Attraction = new Attraction();
    lat = 41.90;
    lng = 12.4963;
    circ: Circle = new Circle();
    picture: File;
    formData = new FormData();

    attractionFile: File = null;
    attractionForm: FormGroup;

    constructor(private service: AttractionService,
        private router: Router,
        private fb: FormBuilder) {
        this.attractionForm = this.fb.group({
            name: ['', [Validators.required]],
            category: ['', Validators.required],
            description: ''
        });
    }

    ngOnInit() {
        this.attractionForm = this.fb.group({
            name: ['', [Validators.required]],
            category: ['', Validators.required],
            description: ''
        });
    }

    select(attraction) {
        console.log(attraction);
    }

    mapclick(event) {
        this.circ = new Circle();
        this.circ.lat = +event.coords.lat;
        this.circ.lng = +event.coords.lng;
        this.circ.radius = 100;
    }

    rChange(c, value) {
        this.circ.radius = value;
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            this.picture = event.target.files[0];
            console.log(this.picture);
            // this.form.get('avatar').setValue(file);
        }
    }

    finish() {
        this.formData.set('name', this.attraction.name);
        this.formData.set('latitude', this.circ.lat.toString());
        this.formData.set('longitude', this.circ.lng.toString());
        this.formData.set('radius', this.circ.radius.toString());
        this.formData.set('description', this.attraction.description);
        this.formData.set('picture', this.picture);
        this.attraction.latitude = this.circ.lat;
        this.attraction.longitude = this.circ.lng;
        this.attraction.radius = this.circ.radius;
        this.service.addCityAttractionB(this.formData).subscribe(attraction => {
            this.router.navigate(['/home', 'attractions']);
        });
    }

    get name() { return this.attractionForm.get('name'); }
    get category() { return this.attractionForm.get('category'); }
    get description() { return this.attractionForm.get('description'); }

}

class Circle {
    lat: number;
    lng: number;
    radius: number;
}
