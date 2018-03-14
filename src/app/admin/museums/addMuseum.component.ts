import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MuseumService } from '../../services/museum.service';
import { Museum, Room } from '../../model/museum';
import { MuseumAttraction } from '../../model/attraction';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MuseumAttractionComponent } from './attraction/museumAttraction.component';

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
    startingRoomCheckbox = true;
    newAttractionForm = false;
    newAdjacencyForm = false;
    fileLoaded = false;

    selectedAdjacency: any;

    // FormGroups
    attractionForm: FormGroup;

    bsModalRef: BsModalRef;

    constructor(private fb: FormBuilder,
        private service: MuseumService,
        private modalService: BsModalService) { }

    ngOnInit(): void {

    }

    createMuseum() {
        this.service.createMuseum(this.museumName)
            .subscribe(res => {
                console.log(res);
                this.museum.id = res.id;
                this.newRoomButton = 'shown';
                this.museum.name = this.museumName;
                this.museumNameDisabled = true;
            });
    }

    toggleAddRoomForm() {
        this.newRoomForm = true;
    }

    addRoom() {
        const room: Room = new Room();
        room.name = this.roomName;
        room.starting = this.startingRoom;
        this.service.createRoom(room, this.museum.id)
            .subscribe(res => {
                console.log(res);
                room.id = res.id;
                this.museum.rooms.push(room);
                this.rms.push({ id: room.id, text: room.name });
            });
        this.roomName = '';
        this.newRoomForm = false;
        this.startingRoomCheckbox = false;
        this.startingRoom = false;
    }

    selected(room) {
        this.selectedAdjacency = room;
    }

    removed(room) {
        this.selectedAdjacency = null;
    }

    addAdjacency(room) {
        this.service.addAdjacency(room, this.selectedAdjacency, this.museum.id)
            .subscribe(res => {
                console.log(res);
                this.newAdjacencyForm = false;
                this.museum.rooms.forEach(e => {
                    if (e.id === this.selectedAdjacency.id) {
                        room.adjacent.push(e);
                    }
                });
                this.selectedAdjacency = null;
            });
    }

    removeAdjacency(room, adj) {
        const result = confirm('Vuoi rimuovere la sala ' + adj.name + ' dalle adiacenze della sala ' + room.name + '?');
        if (result) {
            console.log(room);
            console.log(adj);
            this.service.removeAdjacency(room, adj)
            .subscribe(res => {
                console.log(res);
                room. adjacent = room.adjacent.filter(r => {
                    return r.id !== adj.id;
                });
                this.selectedAdjacency = null;
            });
        }

    }

    // TODO try modal for new attraction form
    showNewAttractionForm(area) {
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
        this.service.createAttraction(attraction, this.attractionFile, this.selectedArea.id)
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
        const file = event.target.files[0];
        this.attractionFile = event.target.files[0];
        this.fileLoaded = true;
    }

    deleteAttraction(area, attraction) {
        console.log(attraction);
        if (confirm('Si è certi di voler rimuovere l\'attrazione ' + attraction.name + '?')) {
            this.service.deleteAttraction(attraction.id).subscribe(() => {
                console.log('deleted');
                area.attraction_ms = area.attraction_ms.filter(attr => {
                    return attr.id !== attraction.id;
                });
            }, err => {
                console.error(err);
            });
        }
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

    modalOpen(area) {
        const initialState = {
            selectedArea: area
        };
        this.bsModalRef = this.modalService.show(MuseumAttractionComponent, { initialState });
    }

    get name() { return this.attractionForm.get('name'); }
    get cat() { return this.attractionForm.get('category'); }
    get desc() { return this.attractionForm.get('description'); }
}
