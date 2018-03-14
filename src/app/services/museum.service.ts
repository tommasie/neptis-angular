import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Museum, Room } from '../model/museum';
import { MuseumAttraction } from '../model/attraction';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/do';
import { NotificationService } from './notification.service';

@Injectable()
export class MuseumService {

    museums: Museum[] = [];
    private url = environment.apiUrl;

    constructor(private http: HttpClient, private notification: NotificationService) {
    }

    // Get list of all museums
    getMuseums(): Observable<Museum[]> {
        if (this.museums.length === 0) {
            this.http.get<Museum[]>(this.url + 'museums')
                .subscribe(res => {
                    console.log(res);
                    for (const att of res) {
                        this.museums.push(att);
                    }
                    return new Observable((observer) => {
                        observer.next(this.museums);
                        observer.complete();
                    });
                });
        }
        return new Observable((observer) => {
            observer.next(this.museums);
            observer.complete();
        });
        // return this.http.get<Museum[]>(this.url + 'museums');
    }

    // Add single museum
    createMuseum(name: string): Observable<any> {
        return this.http.post(this.url + 'museum', { name: name })
            .do((museum: Museum) => {
                this.museums.push(museum);
            });
    }

    editMuseum(museum: Museum): Observable<any> {
        return this.http.put(this.url + 'museums/' + museum.id, museum);
    }

    deleteMuseum(museum: Museum) {
        this.http.delete(this.url + 'museums/' + museum.id)
        .subscribe(() => {
            const index = this.museums.findIndex(i => i.id === museum.id);
            this.museums.splice(index, 1);
            this.notification.push({type: 'success', message: 'Museo ' + museum.name + ' correttamente eliminato', isOpen: true});
          }, error => {
            console.error(error);
          });
    }


    // Add single room
    addRoom(museum: Museum) {
        this.http.post(this.url + 'rooms', museum).subscribe((res) => { console.log(res); });
    }

    createRoom(room: Room, museum_id: number): Observable<any> {
        return this.http.post(this.url + 'rooms', { name: room.name, starting: room.starting, museum_id: museum_id });
    }

    addAdjacency(room: Room, adjacent, museum_id: number): Observable<any> {
        return this.http.post(this.url + 'room/adjacency', { source: room.id, destination: adjacent.id, museum_id: museum_id });
    }

    removeAdjacency(room: Room, adjacent): Observable<any> {
        return this.http.delete(this.url + `room/adjacency/${room.id}/${adjacent.id}`);
    }

    getMuseum(id: number): Observable<Museum> {
        return this.http.get<Museum>(this.url + 'museums/' + id);
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
