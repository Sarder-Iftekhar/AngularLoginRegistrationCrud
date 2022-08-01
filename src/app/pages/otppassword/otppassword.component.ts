import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otppassword',
  templateUrl: './otppassword.component.html',
  styleUrls: ['./otppassword.component.css']
})
export class OtppasswordComponent implements OnInit {
  otpPassForm: FormGroup;

  constructor(
    private OTP: FormBuilder,
    public router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.otpPassForm = this.OTP.group({
      userName: [null, Validators.required],
      otpPassword: [null, Validators.required],
    });
  }

  onOtpSuccess() {
    if (this.otpPassForm.valid) {
      this.router.navigate(['/create-password']);
    } else {
      this.openSnackBar()
    }
  }

  openSnackBar() {
    this.snackBar.open('Please fill the required fields !!!', 'OK', { duration: 5000 });
  }
}