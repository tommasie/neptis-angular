import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MuseumService } from '../../../services/museum.service';
import { Museum, Room } from '../../../model/museum';
import { MuseumAttraction } from '../../../model/attraction';
import { BsModalRef } from 'ngx-bootstrap/modal';
@Component({
    selector: 'app-admin-museum-attraction',
    templateUrl: './museumAttraction.component.html',
    // styleUrls: ['./attraction.component.css']
})

export class MuseumAttractionComponent implements OnInit {

    attractionFile: File = null;
    fileLoaded: boolean;
    selectedArea: Room = new Room();

    // FormGroups
    attractionForm: FormGroup;

    constructor(private bsModalRef: BsModalRef,
        private fb: FormBuilder,
        private service: MuseumService) { }

    ngOnInit(): void {
        this.attractionForm = this.fb.group({
            name: ['', [Validators.required]],
            category: ['', Validators.required],
            description: ''
        });
    }

    createNewAttraction() {
        const model = this.attractionForm.value;
        const attraction: any = {
            name: model.name as string,
            category: model.category as string,
            description: model.description as string
        };
        console.log(attraction);
        this.service.createAttraction(attraction, this.attractionFile, this.selectedArea.id)
            .subscribe(res => {
                console.log(res);
                attraction.id = res.id;
                this.selectedArea.attraction_ms.push(attraction);
                this.bsModalRef.hide();
            });
        // this.selectedArea.attraction_ms.push(attraction);
    }

    cancel() {
        this.bsModalRef.hide();
    }

    getFile(event) {
        const file = event.target.files[0];
        this.attractionFile = event.target.files[0];
        this.fileLoaded = true;
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

    get name() { return this.attractionForm.get('name'); }
    get cat() { return this.attractionForm.get('category'); }
    get desc() { return this.attractionForm.get('description'); }
}
