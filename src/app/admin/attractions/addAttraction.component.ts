import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { AttractionService } from '../../services/attraction.service';
import {Attraction} from '../../model/attraction';

@Component({
    selector: 'admin-add-attraction',
    templateUrl: './addAttraction.component.html',
    styleUrls: ['./attractions.component.css']
})

export class AddAttractionComponent implements OnInit {

    attraction: Attraction = new Attraction();
    lat: number = 41.90;
    lng: number = 12.4963;
    private img;
    circ : Circle = new Circle();

    constructor(private service: AttractionService,
        private router: Router,
        private http: HttpClient) {}

        ngOnInit() {
        }

        select(attraction) {
            console.log(attraction);
        }

        mapclick(event) {
            this.circ = new Circle();
            this.circ.lat = +event.coords.lat;
            this.circ.lng = +event.coords.lng;
            this.circ.radius = 100;
        }

        rChange(c, value) {
            this.circ.radius = value;
        }

        //   fileChange(event) {
        //       let fileList: FileList = event.target.files;
        //       let file: File = fileList[0];
        //       let formData:FormData = new FormData();
        //       formData.append('uploadFile', file, file.name);
        //       let headers = new HttpHeaders();
        //       headers.set('Content-Type', 'multipart/form-data');
        //       this.http.post("http://localhost:8080/single",formData, {headers: headers})
        //         .subscribe(data => {
        //             console.log(data);
        //         })
        // }

        finish() {
            this.attraction.latitude = this.circ.lat;
            this.attraction.longitude = this.circ.lng;
            this.attraction.radius = this.circ.radius;
            this.service.addCityAttraction(this.attraction).subscribe(attraction => {
                this.router.navigate(['/home','attractions']);
            });
        }

    }

    class Circle {
        lat: number;
        lng: number;
        radius: number;
    }
