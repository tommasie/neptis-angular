import {Component, OnInit} from '@angular/core';
import { AttractionService } from '../../services/attraction.service';

import {Attraction} from '../../model/attraction';
@Component({
  selector: 'admin-attractions',
  templateUrl: './attractions.component.html',
  //styleUrls: ['./attraction.component.css']
})

export class AttractionsComponent implements OnInit {

  attractions: Attraction[];

  selected:boolean = false;
  selectedAttraction: string;

  searchString: string;

  constructor(private service: AttractionService) {
    this.attractions = this.service.attractions;
  }

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.service.getCityAttractions().subscribe(data => {this.attractions = data;});
  }

  select(attraction) {
    console.log(attraction);
    this.selectedAttraction = attraction;
    this.selected = true;
  }
}
