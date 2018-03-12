import { Component, OnInit } from '@angular/core';
import { AttractionService } from '../services/attraction.service';
@Component({
    selector: 'app-admin',
    providers: [AttractionService],
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

    constructor() { }

    ngOnInit() {

    }
}
