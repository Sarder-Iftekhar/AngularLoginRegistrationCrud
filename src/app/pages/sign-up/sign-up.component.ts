import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { signupService } from '../services/registration.service';

interface IApiResponse {
  messsage? : string,
  isSuccess? : boolean
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  

  constructor(
    private signupService: signupService,
    private fb: FormBuilder,
    public router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phoneNumber: [null, Validators.required]
    });
  }

  // onSubmit() {
  //   if (this.signUpForm.valid) {
  //     this.router.navigate(['/otp-password']);
  //   } else {
  //     this.openSnackBar()
  //   }
  // }
  onSubmit() {       
    if (this.signUpForm.valid) { 
      this.signupService.checksignup(this.signUpForm.value).subscribe((res:IApiResponse)=>{
        if (res.isSuccess) {
          this.router.navigate(['/otp-password']);
        } else {
          alert(res.messsage);
        }
      })
    } else {
      this.openSnackBar()
    }
  }

  openSnackBar() {
    this.snackBar.open('Please fill the required fields !!!', 'OK', { duration: 5000 });
  }

}

