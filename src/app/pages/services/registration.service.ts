
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })

  export class signupService {
    constructor(private http: HttpClient) { }
       
    public checksignup(formValue:any) {   
       return this.http.post(`/api/UserRegistration/AddUser`,formValue);
    }
  }
