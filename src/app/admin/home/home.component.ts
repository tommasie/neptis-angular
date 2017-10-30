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
  lat: number;
  lng: number;
  zoom: number;
  map: any;

  constructor(private service: AttractionService) {
      this.lat = 41.902;
      this.lng = 12.499;
      this.zoom = 5;
  }

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.service.getCityAttractions().subscribe(data => {
      this.attractions = data;
      let latTmp = 0;
      let lngTemp = 0;

      for(let attraction of this.attractions) {
        let lat: number  = +attraction['latitude'];
        let lng: number  = +attraction['longitude'];
        latTmp += lat;
        lngTemp += lng;
        let label: string = attraction['name'];
        let marker: marker = {
          lat,lng,label
        }
        this.markers.push(marker);
      }
      this.lat = latTmp / this.attractions.length;
      this.lng = lngTemp / this.attractions.length;
      this.zoom = 14;
    });
    this.service.getMuseums().subscribe(data => {this.museums = data;});
  }

  setLatLng(attraction): void {
      console.log(attraction);
      let lat = +attraction['latitude'];
      let lng = +attraction['longitude'];
      this.lat = 41.902;
      this.lng = 12.499;
      console.log(this.lat);
      console.log(this.lng);
  }

  GoogleMapsAPIWrapper
}



interface marker {
  lat: number;
  lng: number;
  label: string;
}
