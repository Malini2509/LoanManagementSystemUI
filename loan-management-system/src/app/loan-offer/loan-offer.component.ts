import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { loanOffers } from './loan-offer.model';


@Component({
  selector: 'app-loan-offer',
  templateUrl: './loan-offer.component.html',
  styleUrls: ['./loan-offer.component.css']
})
export class LoanOfferComponent {
  loanOffers: loanOffers[] = [];
  filteredOffers: any[] = [];
  errorMessage: string = '';
  loanAmountOptions: number[] = [];
  tenure:number[]=[];
  interestRate:number[]=[];

  filterOffers = new FormGroup({
    loanAmount: new FormControl('', Validators.required),
    rateOfIntrest: new FormControl('',[Validators.required, Validators.max(17)]),
    tenure: new FormControl('', [Validators.required, Validators.max(7)]),
  })
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.listAllOffers();
  }

loanApplicationForm = new FormGroup({
    loanAmount: new FormControl('', Validators.required),
    interestRate: new FormControl('', [Validators.required, Validators.max(17)]),
    tenure: new FormControl('', [Validators.required, Validators.max(7)])
  });

  listAllOffers() {
    this.userService.getAllOffers().subscribe((result) => {
      console.log(result);
      this.loanOffers = result;
      // const loanAmountFrom=this.loanOffers[1].loanAmountFrom;
      // console.log(loanAmountFrom)
    })
  }


  getfilteredOffers() {
    const loanAmount = this.filterOffers.value.loanAmount;
    const tenure = this.filterOffers.value.tenure;
    const rateOfIntrest = this.filterOffers.value.rateOfIntrest;

    if (!loanAmount || !tenure || !rateOfIntrest) {
      console.log('Invalid input values');
      return;
    }

    this.userService.filterLoanOffers(parseInt(loanAmount), parseInt(tenure), parseFloat(rateOfIntrest))
      .subscribe((response: any) => {
        if (response && response.length > 0) {
          this.loanOffers = response;
        } else {
          this.errorMessage = 'Sorry, this offer is not available.';
          console.log(this.errorMessage)
        }
      }, error => {
        console.log('An error occurred while filtering loan offers', error);
      });
  }


  clearDate() {
    this.filterOffers.reset();
    this.errorMessage = '';
  }

  showForm = false;
  // loanAmount: number=0;
  // tenure: number=0;
  // interestRate: number=0;

  showLoanApplicationForm(offer: any) {
    // Retrieve loan amount from and to values from offer object
    const loanAmountFrom = offer.loanAmountFrom;
    const loanAmountTo = offer.loanAmountTo;
    const tenureFrom = offer.tenureFrom;
    const tenureTo = offer.tenureTo;
    const rateOfIntrestFrom = offer.rateOfIntrestFrom;
    const rateOfIntrestTo = offer.rateOfIntrestTo;
    console.log("From: ",loanAmountFrom,tenureFrom,rateOfIntrestFrom);
    console.log("To; ",loanAmountTo,tenureTo,rateOfIntrestTo)
  
    // Create an array of loan amount options
    for (let i = loanAmountFrom; i <= loanAmountTo; i += 50000) {
      this.loanAmountOptions.push(i);
    }
    for (let i = tenureFrom; i <= tenureTo; i += 1) {
      this.tenure.push(i);
    }
    for (let i = rateOfIntrestFrom; i <= rateOfIntrestTo; i += 1) {
      this.interestRate.push(i);
    }
  
    // Show the loan application form
    this.showForm = true;
  }
  
  submitLoanApplication() {
    // Perform any necessary validation here
    
    // Display success message
    alert('Your loan for this offer is taken. We will get back to you.');
    
    // Hide the loan application form
    this.showForm = false;
  }
  
}