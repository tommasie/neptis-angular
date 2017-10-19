import {Component, OnInit} from '@angular/core';
import {Museum} from '../../model/museum';
import { AttractionService } from '../../services/attraction.service';
@Component({
  selector: 'admin-museums',
  templateUrl: './museums.component.html',
  //styleUrls: ['./home.component.css']
})

export class MuseumsComponent implements OnInit {

  museums: Museum[];
  searchString: string;

  constructor(private service: AttractionService) {}

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.service.getMuseums().subscribe(data => {this.museums = data;});
  }
}
