import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.component.html',
  styleUrls: ['./apply-loan.component.css']
})
export class ApplyLoanComponent {
  cities: any[] = [];
  isloanEligible: any;
  submitted = false;

  constructor(private userService: UserService, private toastr: ToastrService) { }

  loanDetails = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required,Validators.email]),
    dateOfBirth: new FormControl('', [Validators.required,ageRangeValidator(21, 67)]),
    panCardNumber: new FormControl('', Validators.required),
    mobileNumber: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    sector: new FormControl('', Validators.required),
    monthlyIncome: new FormControl('', Validators.required),
    monthlyExpenses: new FormControl('',  [Validators.required,monthlyExpensesValidator]),
    purposeOfLoan: new FormControl('', Validators.required),
    loanAmount: new FormControl('', [Validators.required , Validators.max(5000000)])
  })

  onSubmit() {
    if (this.loanDetails.valid && !this.submitted) {
      this.submitted = true;
      this.userService.applyForLoan(this.loanDetails.value).subscribe(
        (result) => {
          console.log(this.loanDetails.value);
          this.isloanEligible = result;
        },
        (error) => {
          console.log(this.loanDetails.value);
          console.log('Error:', error);
          this.toastr.error('An error occurred. Please try again later.');
        },
        () => {
          this.submitted = false;
        }
      );
    } else {
      this.loanDetails.markAllAsTouched();
    }
  }

  ngOnInit() {
    this.userService?.getCities().subscribe((data: any[]) => {
      this.cities = data.map(cities => cities.cityName);
      console.log(this.cities)
    });
  }

  getMaxDate(): string {
    const today = new Date();
    return `${today.getFullYear()}-${this.addZero(today.getMonth() + 1)}-${this.addZero(today.getDate())}`;
  }

  addZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  isDateAfterToday(): boolean {
    const dateOfBirth = this.loanDetails.get('dateOfBirth')?.value;
    if (dateOfBirth) {
      const today = new Date();
      return new Date(dateOfBirth) > new Date(`${today.getFullYear()}-${this.addZero(today.getMonth() + 1)}-${this.addZero(today.getDate())}`);
    }
    return false;
  }
}


function monthlyExpensesValidator(control: AbstractControl): {[key: string]: any} | null {
  const monthlyIncome = control.root.get('monthlyIncome');
  if (monthlyIncome && control.value > monthlyIncome.value * 0.7) {
    return {'invalidAmount': true};
  }
  return null;
}

export function ageRangeValidator(minAge: number, maxAge: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      // if the control value is empty, consider it valid
      return null;
    }

    const currentDate = new Date();
    const inputDate = new Date(control.value);
    const age = currentDate.getFullYear() - inputDate.getFullYear();

    if (age < minAge || age > maxAge) {
      return { ageRange: true };
    }

    return null;
  };
}