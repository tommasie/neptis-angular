import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Museum, Room} from '../model/museum';
import {MuseumAttraction} from '../model/attraction';
import {environment} from '../../environments/environment';

import 'rxjs/add/operator/do';

@Injectable()
export class MuseumService {

  museums: Museum[] = [];
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  // Get list of all museums
  getMuseums(): Observable<Museum[]> {
    return this.http.get<Museum[]>(this.url + 'museums');
  }

  // Add single museum
  createMuseum(name: string): Observable<any> {
    return this.http.post(this.url + 'museum', {name: name});
  }

  // Add single room
  addRoom(museum: Museum) {
    this.http.post(this.url + 'rooms', museum).subscribe((res) => { console.log(res); } );
  }

  createRoom(room: Room, museum_id: number): Observable<any> {
      return this.http.post(this.url + 'rooms', {name: room.name, starting: room.starting, museum_id: museum_id});
  }

  addAdjacency(room: Room, adjacent, museum_id: number): Observable<any> {
      return this.http.post(this.url + 'room/adjacency', {source: room.id, destination: adjacent.id, museum_id: museum_id});
  }

  getMuseum(id: number): Observable<Museum> {
    return this.http.get<Museum>(this.url + 'museums/' + id);
  }

  editMuseum(museum: Museum): Observable<any> {
      return this.http.put(this.url + 'museums/' + museum.id, museum);
  }

  deleteMuseum(museum: Museum): Observable<any> {
      return this.http.delete(this.url + 'museums/' + museum.id);
  }

  createAttraction(attraction: MuseumAttraction, file: File, room_id: number): Observable<any> {
      if (file == null) {
          console.log('Mnnaggiadio');
          return null;
      }
      const form: FormData = new FormData();
      Object.keys(attraction).forEach(e => {
          form.append(e, attraction[e]);
      });
      form.append('picture', file);
      form.append('room_id', room_id.toString());
      console.log(form);
      return this.http.post(this.url + 'attractionm', form);
  }

  editAttraction(attraction: MuseumAttraction, file?: File): Observable<any> {
      const form: FormData = new FormData();
      Object.keys(attraction).forEach(e => {
          form.append(e, attraction[e]);
      });
      form.append('picture', file);
      console.log(form);
      return this.http.put(this.url + 'attractionm', form);
  }

  deleteAttraction(attraction_id: number): Observable<any> {
      return this.http.delete(this.url + 'attractionm/' + attraction_id);
  }
}
