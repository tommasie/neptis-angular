import { Component, OnInit } from '@angular/core';
import { Museum } from '../../model/museum';
import { MuseumService } from '../../services/museum.service';
@Component({
  selector: 'app-admin-museums',
  templateUrl: './museums.component.html',
  // styleUrls: ['./home.component.css']
})

export class MuseumsComponent implements OnInit {

  museums: Museum[] = [];
  searchString: string;

  constructor(private service: MuseumService) { }

  ngOnInit() {
    this.service.getMuseums().subscribe(data => {
      for (const museum of data) {
        this.museums.push(museum);
      }
    });
  }

  delete(museum: Museum): void {
    const result = confirm('Vuoi veramente eliminare il museo "' + museum.name + '"?');
    if (result) {
      // TODO
      // this.service.deleteMuseum(museum).subscribe(res => {});
    }
  }
}
