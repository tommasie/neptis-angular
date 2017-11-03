import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Museum} from '../model/museum';
import {Attraction} from '../model/attraction';
import {environment} from '../../environments/environment';

@Injectable()
export class AttractionService {

  museums: Museum[] = [];
  attractions: Attraction[] = [];
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getCityAttractions(): Observable<Attraction[]> {
    return this.http.get<Attraction[]>(this.url + "attractionc");
  }

  getCityAttraction(id: Number): Observable<Attraction> {
    return this.http.get<Attraction>(this.url + "attractionc/" + id);
  }

  addCityAttraction(attraction: Attraction):Observable<Attraction> {
    this.attractions.push(attraction);
    return this.http.post<Attraction>(this.url + "attractionc", attraction);
  }

  editCityAttraction(attraction: Attraction): Observable<any> {
    return this.http.put(this.url + "attractionc/" + attraction.id, attraction, {responseType:'json'});
  }

  deleteCityAttraction(id: Number) {
    return this.http.delete(this.url + "attractionc/" + id);
  }

  getMuseums(): Observable<Museum[]> {
    return this.http.get<Museum[]>(this.url + "museums");
  }

  getMuseum(id: number): Observable<Museum> {
    return this.http.get<Museum>(this.url + "museums/" + id);
  }

  addMuseum(museum: Museum) {
    this.http.post(this.url + "museums", museum).subscribe((res) => {console.log(res);} );
  }

  editMuseum(museum:Museum) {
      this.http.put(this.url + "museums/" + museum.id, museum).subscribe();
  }

  deleteMuseum(museum:Museum) {
      this.http.delete(this.url + "museums/" + museum.id).subscribe();
  }
}
