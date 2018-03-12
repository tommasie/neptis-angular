import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AttractionService } from '../../services/attraction.service';
import { MuseumService } from '../../services/museum.service';
import { Museum, Room } from '../../model/museum';
import { MuseumAttraction } from '../../model/attraction';
@Component({
    selector: 'app-admin-add-museum',
    animations: [
        trigger('visibility', [
            state('shown', style({ opacity: 1 })),
            state('hidden', style({ opacity: 0 })),
            transition('* => *', animate('1s'))
        ])
    ],
    templateUrl: './addMuseum.component.html',
    // styleUrls: ['./attraction.component.css']
})

export class AddMuseumComponent implements OnInit {

    museum: Museum = new Museum();
    museumName: string;
    roomName: string;
    areaName: string;
    selectedArea: Room = new Room();
    attractionName: string;
    link: string;
    rms = [];

    attraction: MuseumAttraction;
    attractionFile: File = null;

    // UI variables
    museumNameDisabled = false;
    newRoomButton = 'hidden';
    newRoomForm = false;
    startingRoom = false;
    newAttractionForm = false;
    newAdjacencyForm = false;
    fileLoaded = false;

    selectedAdjacency: object;

    // FormGroups
    attractionForm: FormGroup;

    constructor(private fb: FormBuilder,
        private service: AttractionService,
        private museumService: MuseumService) { }

    ngOnInit(): void {

    }

    addMuseum() {
        this.newRoomButton = 'shown';
        this.museum.name = this.museumName;
        this.museumNameDisabled = true;
        this.museumService.createMuseum(this.museumName)
            .subscribe(res => {
                this.museum.id = res.id;
                this.museum.rooms.forEach(room => {
                    this.rms.push({ id: room.id, text: room.name });
                });
            });
    }

    addSala() {
        this.newRoomForm = true;
    }

    addRoom() {
        const room: Room = new Room();
        room.name = this.roomName;
        room.starting = this.startingRoom;
        this.museumService.createRoom(room, this.museum.id)
            .subscribe(res => {
                console.log(res);
                room.id = res.id;
                this.museum.rooms.push(room);
            });
        this.roomName = '';
        this.newRoomForm = false;
    }

    showNewAdjacencyForm(room) {
        this.newAdjacencyForm = true;
    }

    selected(room) {
        this.selectedAdjacency = room;
    }

    removed(room) {
        this.selectedAdjacency = null;
    }

    addAdjacency(room) {
        room.adjacent.push(this.selectedAdjacency);
        this.museumService.addAdjacency(room, this.selectedAdjacency, this.museum.id)
            .subscribe(res => {
                console.log(res);
                this.newAdjacencyForm = false;
            });
        this.selectedAdjacency = null;
    }

    showNewAttractionForm(area) {
        this.selectedArea = area;
        this.newAttractionForm = true;
        this.selectedArea = area;
        this.attraction = new MuseumAttraction();
        this.attractionForm = this.fb.group({
            name: ['', [Validators.required]],
            category: ['', Validators.required],
            description: ''
        });
    }

    createNewAttraction() {
        const model = this.attractionForm.value;
        const attraction: MuseumAttraction = {
            name: model.name as string,
            category: model.category as string,
            description: model.description as string
        };
        this.museumService.createAttraction(attraction, this.attractionFile, this.selectedArea.id)
            .subscribe(res => {
                console.log(res);
                attraction.id = res.id;
                this.selectedArea.attraction_ms.push(attraction);
                this.newAttractionForm = false;
                this.attraction = null;
            });
    }

    cancelNewAttraction() {
        this.newAttractionForm = false;
        this.attraction = null;
    }

    getFile(event) {
        // this.attraction.picture = event.target.files[0];
        const file = event.target.files[0];
        this.attractionFile = event.target.files[0];
        this.fileLoaded = true;
        const reader = new FileReader();

        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
    }

    _handleReaderLoaded(readerEvt) {
        const binaryString = readerEvt.target.result;
        // this.attraction.picture = btoa(binaryString);  // Converting binary string data.
    }

    selectArea(area: Room) {
        this.selectedArea = area;
    }

    addAttraction() {
        const attr: MuseumAttraction = new MuseumAttraction();
        attr.name = this.attractionName;
        this.selectedArea.attraction_ms.push(attr);
        this.attractionName = '';
    }

    getRooms(): string[] {
        const array: string[] = [];
        for (const room of this.museum.rooms) {
            array.push(room.name);
        }
        return array;
    }

    get name() { return this.attractionForm.get('name'); }
    get cat() { return this.attractionForm.get('category'); }
    get desc() { return this.attractionForm.get('description'); }
}
