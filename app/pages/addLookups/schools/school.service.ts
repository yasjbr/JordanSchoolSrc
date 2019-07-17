import { LkpSchool } from './../../../Models/addLookups/schools/lkpSchool';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Lkplookup } from 'src/app/Models/Lookups/lkplookup';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private apiUrl = environment.apiBaseUrl + 'LkpSchool';
  private cityApiUrl = environment.apiBaseUrl + 'LkpLookup';
  
constructor(private http:HttpClient,
  private dialog: MatDialog) { }

///izz:Q: can return cites only rather than all lookups.

cityList():Observable<Lkplookup>{
  return this.http.get<Lkplookup>(this.cityApiUrl,environment.httpOptions);
}

schoolList():Observable<LkpSchool[]>{
  //console.log(this.apiUrl);
 return this.http.get<LkpSchool[]>(this.apiUrl,environment.httpOptions);
}

addSchool(model:LkpSchool):Observable<LkpSchool>{
return this.http.post<LkpSchool>(this.apiUrl,model,environment.httpOptions);
}
deleteSchool(id:number):Observable<void>{
  return this.http.delete<void>(`${this.apiUrl}/${id}`,environment.httpOptions);
}

updateSchool(id: number, model: LkpSchool): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/${id}`, model, environment.httpOptions);
}
getSchool(id:number):Observable<LkpSchool>{
  return this.http.get<LkpSchool>(`${this.apiUrl}/${id}`,environment.httpOptions);
}

}
