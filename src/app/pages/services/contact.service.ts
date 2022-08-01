import { Injectable } from '@angular/core';
//for reactive form approach we have to import
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Contact } from 'src/app/contacts/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  ntificationService: any;

  constructor(private httpClient:HttpClient) { }
  //form group property
  form:FormGroup=new FormGroup({
    contactId: new FormControl(0),
    firstName:new FormControl('',Validators.required),
    middleName:new FormControl(''),
    lastName:new FormControl(''),
    email:new FormControl('',Validators.required),
    phone:new FormControl('', [Validators.required, Validators.minLength(11)])
  })
  initializeFormGroup()
  {
    this.form.setValue({
      firstName:'',
      middleName:'',
      LastName:'',
      email:'',
      phone:''

    });
  }
  contact: any = [];//Contact[];
  populateForm(contact:any){
    //this.form.setValue(contact)
  }
  // deleteEmployee(contactID: string, index: number) {
  //   this.contact.splice(index,1);
  //   //api
  // }
  saveContact(data:any)
  {
    console.log('form ', data)
    return this.httpClient.post(`/api/Contact/SaveContact`, data);
  }


 url='http://localhost:5001/api/Contact/GetAllContact'
  getContacts():Observable<any>
  {
     return this.httpClient.get(`/api/Contact/GetAllContact`);

     //return this.httpClient.get(this.url);
  }

  //for checking
    getContactByParameter(contactId:number):Observable<any>
  {
    //passed parameter employeeID:string                 //error:3
    //get by using doller sign ----  ${employeeID}
    //like this change param name in backend controller in getEmployeeBy parameter function also
     return this.httpClient.get(`/api/Contact/GetContactById/${contactId}`);
     //return this.httpClient.get(this.url1);
  }

  deleteContact(contactId:any)
  {
    return this.httpClient.delete(`/api/Contact/DeleteContact/`+contactId);
  }

}
