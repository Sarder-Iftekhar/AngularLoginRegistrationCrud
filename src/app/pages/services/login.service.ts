import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })

  export class LoginService {
    constructor(private http: HttpClient) { }
       
    public GetUser(formValue:any) {    
       return this.http.post(`/api/LoginUser/UserLogin`,formValue);
    }

  }

