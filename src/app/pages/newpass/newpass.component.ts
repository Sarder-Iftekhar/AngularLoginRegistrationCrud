import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newpass',
  templateUrl: './newpass.component.html',
  styleUrls: ['./newpass.component.css']
})
export class NewpassComponent implements OnInit {
  newPassForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.newPassForm = this.fb.group({
      password: [null, Validators.required],
      rePassword: [null, Validators.required]
    });
  }

  onResetPassword() {
    if (this.newPassForm.valid) {
      this.router.navigate(['/login']);
    } else {
      this.openSnackBar()
    }
  }

  openSnackBar() {
    this.snackBar.open('Please fill the required fields !!!', 'OK', { duration: 5000 });
  }

}
