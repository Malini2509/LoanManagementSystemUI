import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-approve-loan',
  templateUrl: './approve-loan.component.html',
  styleUrls: ['./approve-loan.component.css']
})

export class ApproveLoanComponent {

  showLoanDetails = true; // add back the showLoanDetails variable

  loanApplication: any;
  constructor(private userService: UserService) {
    this.listAllLoans();
  }

  listAllLoans() {
    this.userService.listAllLoanApplication().subscribe((response) => {
      console.log(response);
      this.loanApplication = response;
    },
      (error) => {
        console.log(error);
      })
  }

  approveLoan(loanId: string) {
    console.log(loanId);
    this.userService.approveLoan(loanId).subscribe(
      (response) => {
        console.log("Loan approval response:", response);
        alert("The loan is approved successfully");
        this.loanApplication = this.loanApplication.filter((loan: any) => loan.loanId !== loanId);
      },
      (error) => {
        console.log("Error approving loan:", error);
      }
    );
  }
  

  // removeLoan(loanId: string) {
  //   // find and remove the loan from the loanApplication array
  //   let index = this.loanApplication.findIndex((loan: any) => loan.id === loanId);
  //   if (index !== -1) {
  //     this.loanApplication.splice(index, 1);
  //   }
  // }

}
