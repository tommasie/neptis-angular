import {Component, OnInit, Input} from '@angular/core';
import { AttractionService } from '../../services/attraction.service';
import {Museum, Room, MuseumAttraction} from '../../model/museum';
@Component({
    selector: 'admin-add-museum',
    templateUrl: './addMuseum.component.html',
    //styleUrls: ['./attraction.component.css']
})

export class AddMuseumComponent implements OnInit {

    museum: Museum = new Museum();
    museumName: string;
    areaName: string;
    selectedArea: Room = new Room();
    attractionName: string;
    link: string;

    constructor(private service: AttractionService) {}

    ngOnInit() {
    }

    addRoom() {
        let room: Room = new Room();
        room.name = this.areaName;
        this.museum.rooms.push(room);
        this.areaName = "";
    }

    selectArea(area:Room) {
        this.selectedArea = area;
    }

    addAttraction() {
        let attr: MuseumAttraction = new MuseumAttraction();
        attr.name = this.attractionName;
        this.selectedArea.attraction_ms.push(attr);
        this.attractionName = "";
    }

    getRooms(): string[] {
        let array:string[] = []
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
        console.log(this.museum);
        this.service.addMuseum(this.museum);
    }

}
