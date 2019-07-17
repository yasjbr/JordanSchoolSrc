import { Class } from './../../../Models/addLookups/classes/class';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private apiUrl = environment.apiBaseUrl + 'LkpClass';
  constructor(private http:HttpClient) { }

  classList():Observable<Class[]>{
    return this.http.get<Class[]>(this.apiUrl,environment.httpOptions);
  }

  /*
  addSection(model: LkpSection):Observable<LkpSection>{
    return this.http.post<LkpSection>(this.apiUrl,model,environment.httpOptions);
  }

  deleteSection(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`,environment.httpOptions)
  }
  updateSection(id:number, model:LkpSection):Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/${id}`,model,environment.httpOptions);
  }
getSection(id:number):Observable<LkpSection>{
return this.http.get<LkpSection>(`${this.apiUrl}/${id}`,environment.httpOptions);
}
*/
}
