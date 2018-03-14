import { Component, OnInit } from '@angular/core';
import { Museum } from '../../model/museum';
import { MuseumService } from '../../services/museum.service';
@Component({
    selector: 'app-admin-museums',
    templateUrl: './museums.component.html',
    styleUrls: ['./museums.component.css']
})

export class MuseumsComponent implements OnInit {

    museums: Museum[] = [];
    searchString: string;

    constructor(private service: MuseumService) {
        this.museums = service.museums;
    }

    ngOnInit() {
        this.service.getMuseums().subscribe(data => {
            this.museums = data;
        });
    }

    delete(museum: Museum): void {
        const result = confirm('Vuoi veramente eliminare il museo "' + museum.name + '"?');
        if (result) {
            this.service.deleteMuseum(museum);
        }
    }
}
