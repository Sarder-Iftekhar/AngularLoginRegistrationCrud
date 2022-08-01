import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../services/login.service';

interface IApiResponse {
  messsage? : string,
  isSuccess? : boolean
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private snackBar: MatSnackBar,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });

    // throw new Error('Method not implemented.');
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onOtpSuccess() {
    this.router.navigate(['/sign-up']);
  }

  onContact() {
    if (this.loginForm.valid) {
      this.loginService.GetUser(this.loginForm.value).subscribe((res:IApiResponse)=>{
        if (res.isSuccess) {
          this.router.navigate(['/contact']);
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

