import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AttractionService } from '../../services/attraction.service';
import { Attraction } from '../../model/attraction';

@Component({
    selector: 'app-admin-add-attraction',
    templateUrl: './addAttraction.component.html',
    styleUrls: ['./addAttraction.component.css']
})

export class AddAttractionComponent implements OnInit {

    attraction: Attraction = new Attraction();
    lat = 41.90;
    lng = 12.4963;
    circ: Circle = new Circle();
    picture: File;

    attractionFile: File = null;
    fileLoaded = false;
    attractionForm: FormGroup;

    constructor(private service: AttractionService,
        private router: Router,
        private fb: FormBuilder) {
    }

    ngOnInit() {
        this.attractionForm = this.fb.group({
            name: ['', [Validators.required]],
            category: ['', Validators.required],
            description: ''
        });
    }

    mapclick(event) {
        this.circ = new Circle();
        this.circ.lat = +event.coords.lat;
        this.circ.lng = +event.coords.lng;
        this.circ.radius = 100;
    }

    /**
     * Event function fired when the circle's radius is changed
     * @param c circle object
     * @param value new radius value
     */
    rChange(c, value) {
        this.circ.radius = value;
    }

    getFile(event) {
        const file = event.target.files[0];
        this.attractionFile = event.target.files[0];
        this.fileLoaded = true;
    }

    finish() {
        this.prepareAttractionData();
        this.service.createCityAttraction(this.attraction, this.attractionFile)
            .subscribe(attraction => {
                this.router.navigate(['/home', 'attractions']);
            });
    }

    private prepareAttractionData(): void {
        const formModel = this.attractionForm.value;
        this.attraction.name = formModel.name;
        this.attraction.description = formModel.description;
        this.attraction.category = formModel.category;
        this.attraction.latitude = this.circ.lat;
        this.attraction.longitude = this.circ.lng;
        this.attraction.radius = this.circ.radius;
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
