import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Museum} from '../model/museum';
import {Attraction} from '../model/attraction';

@Injectable()
export class AttractionService {

  museums: Museum[] = [];
  attractions: Attraction[] = [];

  private host = "http://localhost:5001/admin";

  constructor(private http: HttpClient) {
  }

  getCityAttractions(): Observable<Attraction[]> {
    return this.http.get<Attraction[]>(this.host + "/attractionc");
  }

  getCityAttraction(id: Number): Observable<Attraction> {
    return this.http.get<Attraction>(this.host + "/attractionc/" + id);
  }

  addCityAttraction(attraction: Attraction) {
    this.attractions.push(attraction);
    this.http.post(this.host + "/attractionc", attraction).subscribe((res) => {console.log(res);});
  }

  editCityAttraction(attraction: Attraction) {
    this.http.put(this.host + "/attractionc/" + attraction.id, attraction).subscribe();
  }

  deleteCityAttraction(id: Number) {
    return this.http.delete(this.host + "/attractionc/" + id);
  }

  getMuseums(): Observable<Museum[]> {
    return this.http.get<Museum[]>(this.host + "/museums");
  }

  getMuseum(id: number): Observable<Museum> {
    return this.http.get<Museum>(this.host + "/museums/" + id);
  }

  addMuseum(museum: Museum) {
    this.http.post(this.host + "/museums", museum).subscribe((res) => {console.log(res);} );
  }

  editMuseum(museum:Museum) {
      this.http.put(this.host + "/museums/" + museum.id, museum).subscribe();
  }

  deleteMuseum(museum:Museum) {
      this.http.delete(this.host + "/museums/" + museum.id).subscribe();
  }

  addAttraction(attraction: Attraction) {
    this.attractions.push(attraction);
    this.http.post(this.host + "/attractionc", attraction).subscribe((res) => {console.log(res);});
  }
}
