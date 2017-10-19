import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { AttractionService } from '../../services/attraction.service';
import {Attraction} from '../../model/attraction';

@Component({
  selector: 'admin-add-attraction',
  templateUrl: './addAttraction.component.html',
  //styleUrls: ['./attraction.component.css']
})

export class AddAttractionComponent implements OnInit {

  attraction: Attraction = new Attraction();
  lat: number = 41.90;
  lng: number = 12.4963;

  circ : Circle = new Circle();

  constructor(private service: AttractionService) {}

  ngOnInit() {
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

  finish() {
    this.attraction.latitude = this.circ.lat;
    this.attraction.longitude = this.circ.lng;
    this.attraction.radius = this.circ.radius;
    this.service.addAttraction(this.attraction);
  }

}

class Circle {
  lat: number;
  lng: number;
  radius: number;
}
