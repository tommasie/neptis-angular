import { Component, OnInit } from '@angular/core';
import { AttractionService } from '../../services/attraction.service';
import { NotificationService } from '../../services/notification.service';
import { AlertModule } from 'ngx-bootstrap/alert';
import { Attraction } from '../../model/attraction';

@Component({
    selector: 'app-admin-attractions',
    templateUrl: './attractions.component.html',
    styleUrls: ['./attractions.component.css']
})

export class AttractionsComponent implements OnInit {

    attractions: Attraction[] = [];
    loading: boolean;
    selected = false;
    selectedAttraction: string;

    searchString: string;

    constructor(private service: AttractionService, private notification: NotificationService) {
        this.attractions = service.attractions;
    }

    ngOnInit() {
        this.load();
    }

    load(): void {
        this.loading = true;
        this.service.getCityAttractions().subscribe(data => {
            this.attractions = data;
            this.loading = false;
        });
    }

    select(attraction) {
        console.log(attraction);
        this.selectedAttraction = attraction;
        this.selected = true;
        this.notification.push({ type: 'success', message: attraction.name, isOpen: true });
    }

    delete(attraction: Attraction) {
        const result = confirm('Vuoi veramente eliminare l\'attrazione "' + attraction.name + '"?');
        if (result) {
            this.service.deleteCityAttraction(attraction.id);
        }
    }
}
