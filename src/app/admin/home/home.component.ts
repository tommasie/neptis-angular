import {Component, OnInit} from '@angular/core';
import { AttractionService } from '../../services/attraction.service';

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
  lat: number = 41.90;
  lng: number = 12.4963;

  constructor(private service: AttractionService) {}

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.service.getCityAttractions().subscribe(data => {
      this.attractions = data;
      for(let attraction of this.attractions) {
        let lat: number  = +attraction['latitude']
        let lng: number  = +attraction['longitude']
        let label: string = attraction['name'];
        let marker: marker = {
          lat,lng,label
        }
        this.markers.push(marker);
      }
    });
    this.service.getMuseums().subscribe(data => {this.museums = data;});
  }
}

interface marker {
  lat: number;
  lng: number;
  label: string;
}
