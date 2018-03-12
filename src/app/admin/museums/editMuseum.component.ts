import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { AttractionService } from '../../services/attraction.service';
import { MuseumService } from '../../services/museum.service';
import { Museum, Room } from '../../model/museum';
import { MuseumAttraction } from '../../model/attraction';

@Component({
    selector: 'app-admin-edit-museum',
    animations: [
        trigger('visibility', [
            state('shown', style({ height: '*' })),
            state('hidden', style({ height: 0 })),
            transition('* => *', animate('1s'))
        ])
    ],
    templateUrl: './editMuseum.component.html',
    // styleUrls: ['./attraction.component.css']
})

export class EditMuseumComponent implements OnInit {

    museum: Museum = new Museum();
    museumCopy: Museum = new Museum();
    // variables for temporary edits
    museumName: string;
    roomName: string;
    areaName: string;
    selectedArea: Room = new Room();
    selectedAttraction: MuseumAttraction;
    attractionName: string;
    link: string;
    rms = [];

    attraction: MuseumAttraction;
    attractionFile: File = null;

    // UI variables
    museumNameDisabled = true;
    newRoomButton = true;
    newRoomForm = false;
    startingRoom = false;
    newAttractionForm = false;
    newAdjacencyForm = false;
    fileLoaded = false;

    selectedAdjacency: object;

    // FormGroups
    attractionForm: FormGroup;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private service: AttractionService,
        private museumService: MuseumService) { }


    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) =>
                this.service.getMuseum(+params.get('id')))
            .subscribe(museum => {
                console.log(museum);
                this.museum = museum;
                this.museumCopy = Object.assign({}, this.museum);
                this.museumCopy.rooms.forEach(room => {
                    this.rms.push({ id: room.id, text: room.name });
                });
            });
        this.attractionForm = this.fb.group({
            name: ['', [Validators.required]],
            category: ['', Validators.required],
            description: ''
        });
    }

    enableMuseumEdit(): void {
        this.museumNameDisabled = !this.museumNameDisabled;
    }

    editMuseum() {
        this.museumService.editMuseum(this.museumCopy)
            .subscribe(res => {
                console.log(res);
                this.museumNameDisabled = true;
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

    deleteRoom(area) {
        if (confirm('Sei sicuro di voler eliminare la sala ' + area.name + '?')) {

        }
    }

    showNewAttractionForm(area) {
        this.selectedArea = area;
        this.newAttractionForm = true;
        this.selectedArea = area;
        this.attraction = new MuseumAttraction();

        /*this.attractionForm = new FormGroup({
            'name': new FormControl(this.attraction.name, [Validators.required, Validators.minLength(4)]),
            'category': new FormControl(this.attraction.category, Validators.required),
            'description': new FormControl(this.attraction.description)
        });*/
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

    showEditAttractionForm(attraction) {
        this.newAttractionForm = true;
        this.selectedAttraction = attraction;
        this.attractionForm = this.fb.group({
            name: [this.selectedAttraction.name, [Validators.required]],
            category: [this.selectedAttraction.category, Validators.required],
            description: this.selectedAttraction.description
        });
        /*this.attractionForm = new FormGroup({
            'name': new FormControl(this.attraction.name, [Validators.required, Validators.minLength(4)]),
            'category': new FormControl(this.attraction.category, Validators.required),
            'description': new FormControl(this.attraction.description)
        });*/
    }

    editAttraction() {
        const model = this.attractionForm.value;
        const attraction: MuseumAttraction = {
            name: model.name as string,
            category: model.category as string,
            description: model.description as string
        };
        this.museumService.editAttraction(attraction, this.attractionFile)
            .subscribe(res => {
                console.log(res);
                attraction.id = res.id;
                this.selectedArea.attraction_ms.push(attraction);
                this.newAttractionForm = false;
                this.attraction = null;
            });
    }

    cancelEditAttraction() {
        this.newAttractionForm = false;
        this.attraction = null;
    }

    deleteAttraction(attraction) {
        console.log(attraction);
        if (confirm('Si è certi di voler rimuovere l\'attrazione ' + attraction.name + '?')) {
            this.museumService.deleteAttraction(attraction.id).subscribe(res => {
                this.museum.rooms.forEach((room, i) => {
                    room.attraction_ms.forEach((attr: MuseumAttraction, j) => {
                        if (attr.id === attraction.id) {
                            room.attraction_ms.slice(j, 1);
                        }

                    });
                });
            });
        }
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
