import { lkpTour } from './../../../Models/addLookups/tours/lkpTour';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TourService {


  private apiUrl = environment.apiBaseUrl + 'LkpTour';
  
constructor(private http: HttpClient) { }

tourList():Observable<lkpTour[]>{
  return this.http.get<lkpTour[]>(this.apiUrl,environment.httpOptions);
}

}
