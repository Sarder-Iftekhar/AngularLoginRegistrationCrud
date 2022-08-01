import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { AuthorizationService } from '../pages/services/authorization.service';
import { signupService } from '../pages/services/registration.service';

interface IApiResponse {
  messsage? : string,
  isSuccess? : boolean
}

@Component({
  selector: 'app-autherization',
  templateUrl: './autherization.component.html',
  styleUrls: ['./autherization.component.css']
})


export class AutherizationComponent implements OnInit {

  formId = 'autherization';
  form          : FormGroup;
  currentDate   : any= moment().format('YYYY-MM-DDThh:mm:ssZ');
  loginUser     : string;
  subscription  : Subscription;
  approveSub    : Subscription;
  fetch_data    : any;
  submitObj = {};

  displayedColumns = [
    'email',
    'firstName',
    'lastName',
    'phoneNumber',
    // 'password',
    'isAutherized',
    'action'
  ];

  dataSource =  new MatTableDataSource();

  constructor(
    private fb: FormBuilder,
    public authorizationService :AuthorizationService,
    public signupService: signupService,
  ) { }

  ngOnInit(): void {
    //this.authService.authInfo.subscribe(data => {
     //this.loginUser = data['usercode'];
    //});

    this.form = this.fb.group({
      id            : [],
      isAuthorized  : ['']
      // update_date   : [this.currentDate],
      // order_date    : [this.currentDate]
    });

    this.getAuthorizationData();

  }

  onAuthorized(value:string, element: any) {
      element.isAuthorized = value;
      console.log('adsfsdaf ', element);

     this.approveSub = this.authorizationService.authorizedUser(element).subscribe((res: IApiResponse)=> {
      if (res.isSuccess) {
        this.authorizationService.sendMailWthOtp(element.email, element.password).subscribe((res: IApiResponse)=> {
          alert('Successfully Athorized!');
          this.getAuthorizationData();
        });
        } else {
          alert('Successfully Error!');
        }
      })
  }



  getAuthorizationData(){
    this.subscription =
    this.authorizationService.getAuthList().subscribe((getData) => {

        this.fetch_data = getData;
        this.dataSource.data = this.fetch_data;

    });
  }


  // updateData(formValue) {
  //   this.asyncService.start();
  //   this.subscription =
  //   this.proposeService.updateProposeApproval({obj: this.submitObj}).subscribe(update => {
  //     this.commonService.showSuccessMsg('Data Successfully updated.');
  //     this.getProposeApproval();
  //     this.asyncService.finish();
  //   }, error => {
  //     console.log('Error to Approve of propose transfer!');
  //     this.asyncService.finish();
  //   })
  // }


  // onSaveConfirmation = (): void => {
  //   this.commonService.showDialog(
  //     {
  //       title: 'Confirmation - Save Record',
  //       content: 'Are you sure to approve this?',
  //     },
  //     () => this.updateData(this.form.value)
  //   );
  // };


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
