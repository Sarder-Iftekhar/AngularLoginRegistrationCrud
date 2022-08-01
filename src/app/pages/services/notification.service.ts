import { Injectable } from '@angular/core';
import { MatSnackBar,MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar:MatSnackBar) { }

  config:MatSnackBarConfig={
    duration:3000,
    horizontalPosition:'right',
    verticalPosition:'top'
  }

  success_old(msg:any){
    this.config['panelClass']=['notification','success'];
    this.snackBar.open(msg,'this.config');
  }

  success(msg: string, duration = 3000): void {
    this.snackBar.open(msg, '', {
      duration: duration,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['snackbar-container', 'success'],
    });
    
  }



  warn(msg:any) {
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(msg, '', this.config);
  }
}
