import { Component, OnInit } from '@angular/core';
import { AttractionService } from '../../services/attraction.service';
import { MuseumService } from '../../services/museum.service';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { Attraction } from '../../model/attraction';
import { Museum } from '../../model/museum';

@Component({
    selector: 'app-admin-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    attractions: Attraction[] = [];
    museums: Museum[] = [];

    markers: IMarker[] = [];
    lat = 41.902;
    lng = 12.499;
    zoom = 5;
    map: any;

    constructor(private attractionService: AttractionService,
        private museumService: MuseumService) { }

    ngOnInit() {
        this.load();
    }

    load(): void {
        this.attractionService.getCityAttractions().subscribe(data => {
            this.attractions = data;
            if (this.attractions.length > 0) {
                let latTmp = 0;
                let lngTemp = 0;

                for (const attraction of this.attractions) {
                    const lat: number = +attraction.latitude;
                    const lng: number = +attraction.longitude;
                    latTmp += lat;
                    lngTemp += lng;
                    const label: string = attraction.name;
                    const marker: IMarker = {
                        lat, lng, label
                    };
                    this.markers.push(marker);
                }
                this.lat = latTmp / this.attractions.length;
                this.lng = lngTemp / this.attractions.length;
                this.zoom = 14;
            }

        });
        this.museumService.getMuseums().subscribe(data => { this.museums = data; });
    }

    setLatLng(attraction): void {
        const lat = +attraction['latitude'];
        const lng = +attraction['longitude'];
        this.lat = lat;
        this.lng = lng;
    }
}

interface IMarker {
    lat: number;
    lng: number;
    label: string;
}
