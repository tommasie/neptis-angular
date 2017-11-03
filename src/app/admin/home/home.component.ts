import {Component, OnInit} from '@angular/core';
import { AttractionService } from '../../services/attraction.service';

import {GoogleMapsAPIWrapper} from '@agm/core';
import {Attraction} from '../../model/attraction';
import {Museum} from '../../model/museum';

@Component({
    selector: 'admin-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    attractions: Attraction[];
    museums: Museum[];

    markers: marker[] = [];
    lat: number = 41.902;
    lng: number = 12.499;
    zoom: number = 5;
    map: any;

    constructor(private service: AttractionService) {}

    ngOnInit() {
        this.load();
    }

    load(): void {
        this.service.getCityAttractions().subscribe(data => {
            this.attractions = data;

            let latTmp = 0;
            let lngTemp = 0;

            for(let attraction of this.attractions) {
                let lat: number = attraction.latitude;
                let lng: number = attraction.longitude;
                latTmp += lat;
                lngTemp += lng;
                let label: string = attraction.name;
                let marker: marker = {
                    lat,lng,label
                }
                this.markers.push(marker);
            }
            if(this.attractions.length > 0) {
                this.lat = latTmp / this.attractions.length;
                this.lng = lngTemp / this.attractions.length;
                this.zoom = 14;
            }

        });
        this.service.getMuseums().subscribe(data => {this.museums = data;});
    }

    setLatLng(attraction): void {
        let lat = +attraction['latitude'];
        let lng = +attraction['longitude'];
        this.lat = lat;
        this.lng = lng;
    }
}

interface marker {
    lat: number;
    lng: number;
    label: string;
}
