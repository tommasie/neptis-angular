import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Museum } from '../model/museum';
import { Attraction } from '../model/attraction';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/do';

@Injectable()
export class AttractionService {

  attractions: Attraction[] = [];
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getCityAttractions(): Observable<any> {
    if (this.attractions.length === 0) {
      this.http.get<Attraction[]>(this.url + 'attractionc')
        .subscribe(res => {
          console.log(res);
          for (const att of res) {
            this.attractions.push(att);
          }
          return new Observable((observer) => {
            observer.next(this.attractions);
            observer.complete();
          });
        });
    }
    return new Observable((observer) => {
      observer.next(this.attractions);
      observer.complete();
    });

  }

  addCityAttraction(attraction: Attraction): Observable<Attraction> {
    return this.http.post<Attraction>(this.url + 'attractionc', attraction)
      .do(res => {
        this.attractions.push(res);
      });
  }

  addCityAttractionB(attraction: FormData): Observable<Attraction> {
    return this.http.post<Attraction>(this.url + 'attractionc', attraction)
      .do(res => {
        this.attractions.push(res);
      });
  }

  getCityAttraction(id: Number): Observable<Attraction> {
    return this.http.get<Attraction>(this.url + 'attractionc/' + id);
  }

  editCityAttraction(attraction: Attraction): Observable<any> {
    return this.http.put(this.url + 'attractionc/' + attraction.id, attraction, { responseType: 'json' });
  }

  deleteCityAttraction(id: Number) {
    this.http.delete(this.url + 'attractionc/' + id)
      .subscribe(res => {
        console.log(res);
        const index = this.attractions.findIndex(i => i.id === id);
        this.attractions = this.attractions.splice(index, 1);
      }, error => {
        console.error(error);
      });
  }

  createCityAttraction(attraction: Attraction, file: File): Observable<any> {
    if (file == null) {
      console.log('Mnnaggiadio');
      return null;
    }
    const form: FormData = new FormData();
    Object.keys(attraction).forEach(e => {
      let value = attraction[e];
      if (typeof attraction[e] !== 'string') {
        value = value.toString();
      }
      form.append(e, value);
    });
    form.append('picture', file);
    console.log(form);
    return this.http.post(this.url + 'attractionc', form)
      .do(attr => {
        this.attractions.push(attr as Attraction);
      });
  }
}
