import { users } from './../../Models/Users/users';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.apiBaseUrl + 'Users/checkLogin';
constructor(private http: HttpClient) { }



getUser(userName:string, password:string):Observable<users>{
  return this.http.get<users>(`${this.apiUrl}/${userName}/${password}`,environment.httpOptions);
} 



}
