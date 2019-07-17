import { LkpBus } from './../../../Models/addLookups/bus/lkpBus';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusService {


  private apiUrl = environment.apiBaseUrl + 'LkpBus';
constructor(private http: HttpClient) {}


busList():Observable<LkpBus[]>{
  return this.http.get<LkpBus[]>(this.apiUrl,environment.httpOptions);
}

}
