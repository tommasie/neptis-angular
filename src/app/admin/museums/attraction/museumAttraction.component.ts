import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import {MuseumService} from '../../../services/museum.service';
import {Museum, Room} from '../../../model/museum';
import {MuseumAttraction} from '../../../model/attraction';
@Component({
    selector: 'admin-museum-attraction',
    templateUrl: './museumAttraction.component.html',
    //styleUrls: ['./attraction.component.css']
})

export class MuseumAttractionComponent implements OnInit {

    @Input() selectedArea: Room;
    @Output() created: EventEmitter<boolean> = new EventEmitter<boolean>();

    //FormGroups
    attractionForm: FormGroup;

    constructor(private fb: FormBuilder, private museumService: MuseumService) {}

    ngOnInit(): void {
        this.attractionForm = this.fb.group({
            name: ['', [Validators.required]],
            category: ['', Validators.required],
            description: ''
        });
    }

    createNewAttraction() {
        let model = this.attractionForm.value;
        let attraction = {
            name: model.name as string,
            category: model.category as string,
            description: model.description as string
        }
        this.created.emit(true);
        console.log(attraction);
        this.selectedArea.attraction_ms.push(attraction);
        //this.onCreated.emit(true);
    }

    cancel() {
        console.log("gna");
        this.created.emit(false);
    }

    /*getFile(event) {
        this.attraction.picture = event.target.files[0];
        var file    = event.target.files[0];
          var reader  = new FileReader();

          reader.onload = this._handleReaderLoaded.bind(this);
       reader.readAsBinaryString(file);
   }*/

  /* _handleReaderLoaded(readerEvt) {
       var binaryString = readerEvt.target.result;
       this.attraction.picture = btoa(binaryString);  // Converting binary string data.
   }*/

    get name() {return this.attractionForm.get('name');}
    get cat() {return this.attractionForm.get("category");}
    get desc() {return this.attractionForm.get('description');}
}
