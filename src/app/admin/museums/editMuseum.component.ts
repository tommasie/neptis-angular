import {Component, OnInit, Input} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { AttractionService } from '../../services/attraction.service';
import {Museum, Room, MuseumAttraction} from '../../model/museum';

@Component({
  selector: 'admin-edit-museum',
  templateUrl: './editMuseum.component.html',
  //styleUrls: ['./attraction.component.css']
})

export class EditMuseumComponent implements OnInit {

  private museum: Museum = new Museum();
  private areaName: string;
  private selectedArea: Room = new Room();
  private attractionName: string;
  private link: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: AttractionService) {}

  ngOnInit() {
      this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.service.getMuseum(+params.get('id')))
        .subscribe(museum => this.museum = museum);
  }

  addRoom() {
    let room: Room = new Room();
    room.name = this.areaName;
    this.museum.rooms.push(room);
    this.areaName = "";
  }

  selectArea(area:Room) {
    this.selectedArea = area;
    console.log(this.selectedArea);
  }

  addAttraction() {
    let attr: MuseumAttraction = new MuseumAttraction();
    attr.name = this.attractionName;
    this.selectedArea.attraction_ms.push(attr);
    this.attractionName = "";
  }

  getRooms(): string[] {
    let array:string[] = [];
    for(let room of this.museum.rooms) {
      array.push(room.name);
    }
    return array;
  }

  addLink(event) {
    for(let room of this.museum.rooms) {
      if(event['text']==room.name)
        this.selectedArea.adjacent.push(room);
    }

  }

  addStartRoom(event) {
    for(let room of this.museum.rooms) {
      if(event['text']==room.name)
        this.museum.start = room;
    }
  }

  addEndRoom(event) {
    for(let room of this.museum.rooms) {
      if(event['text']==room.name)
        this.museum.end = room;
    }
  }

  finish() {
    this.service.editMuseum(this.museum);
  }

}
