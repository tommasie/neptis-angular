import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { AttractionService } from '../../services/attraction.service';
import { Attraction } from '../../model/attraction';

@Component({
    selector: 'app-admin-attraction',
    templateUrl: './editAttraction.component.html',
    // styleUrls: ['./attraction.component.css']
})

export class EditAttractionComponent implements OnInit {

    attraction: Attraction;
    private name: string;
    private latitude: number;
    private longitude: number;

    private attractionFile;
    private fileLoaded = false;

    readonly = true;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private service: AttractionService) {
        this.attraction = new Attraction();
    }

    ngOnInit() {
        this.route.paramMap
            .switchMap((params: ParamMap) =>
                this.service.getCityAttraction(+params.get('id')))
            .subscribe(attraction => {
                this.attraction = attraction;
                this.attraction.latitude = +this.attraction.latitude;
                this.attraction.longitude = +this.attraction.longitude;
                console.log(this.attraction);
            });
    }

    enableEdit() {
        this.readonly = false;
    }

    mapclick(event) {
        console.log(event);
        this.attraction.latitude = event.coords.lat;
        this.attraction.longitude = event.coords.lng;
    }

    drag(m, $event: MouseEvent) {
        console.log($event);
        this.attraction.latitude = $event['lat'];
        this.attraction.longitude = $event['lng'];
    }

    rChange(attraction, event) {
        console.log(attraction, event);
        this.attraction.radius = event;
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

    finish() {
        // TODO PUT data to server
        this.service.editCityAttraction(this.attraction).subscribe(res => {
            console.log(res);
        }, err => {
            console.log(err);
        });
    }

}

class Circle {
    lat: number;
    lng: number;
    radius: number;
}
