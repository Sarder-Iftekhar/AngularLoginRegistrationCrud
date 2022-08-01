import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })

  export class AuthorizationService {
    constructor(private http: HttpClient) { }

    public getAuthList() {
       return this.http.get(`api/AuthorizationRequest/AuthorizationRequestList`);
    };

    public authorizedUser(formValue: any) {
      return this.http.post(`/api/AuthorizationRequest/AuthorizedUser`, formValue)
    };

    public sendMailWthOtp(mail: string, otp: string) {
      console.log(mail, otp);

      return this.http.post(`/api/AuthorizationRequest/SendMail/`+ mail + '/' + otp, null);
    }

  }

