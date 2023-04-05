import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { loanApplication } from './loanapplication.model';

@Component({
  selector: 'app-track-application',
  templateUrl: './track-application.component.html',
  styleUrls: ['./track-application.component.css']
})
export class TrackApplicationComponent {
  loanApplication: loanApplication | null = null;
  errorMessage: string = '';

  constructor(private userService: UserService) { }

  TrackMyApp = new FormGroup({
    loanId: new FormControl('', Validators.required)
  });

  checkApplicationStatus() {
    this.loanApplication = null;
    this.errorMessage = '';
    let loanId = this.TrackMyApp.get('loanId')?.value;
    if (loanId) {
        const pattern = /^Loan\d{4}[A-Z]$/;
        if (!pattern.test(loanId)) {
          console.log('Invalid loanId format, please enter the correct format');
          this.errorMessage = 'Invalid loanId format, please enter the correct format';
          return;
        }
        this.userService.getLoanApplicationStatus(loanId)
          .subscribe((response: loanApplication) => {
            console.log(response);
            this.loanApplication = response;
          },
            (error) => {
              console.log('Invalid loanId, please enter the valid loan id');
              this.errorMessage = 'Invalid loanId, please enter the valid loan id';
            });
      }
    }
  
  onSubmit() {
    this.checkApplicationStatus();
  }

}