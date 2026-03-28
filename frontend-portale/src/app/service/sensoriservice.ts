import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sensore } from '../responce/sensore';

@Injectable({
  providedIn: 'root',
})
export class Sensoriservice {
  private http: HttpClient = inject(HttpClient);
  private url: string = "http://localhost:8080"

  getStoricoBySensoreId(sensorID: number): Observable<Sensore>{
    return this.http.get<Sensore>(this.url + "/storico-misure/storico/"+sensorID)
  }

}
