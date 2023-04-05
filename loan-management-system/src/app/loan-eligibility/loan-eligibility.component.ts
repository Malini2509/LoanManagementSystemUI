import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-loan-eligibility',
  templateUrl: './loan-eligibility.component.html',
  styleUrls: ['./loan-eligibility.component.css']
})
export class LoanEligibilityComponent {
  cities: any[] = [];
  loanAmount: any;
  loanEligibilityAmount=false;

  constructor(private userService: UserService) { }

  loanEligibility = new FormGroup({
    city: new FormControl('', Validators.required),
    sector: new FormControl('', Validators.required),
    monthlyIncome: new FormControl('', Validators.required),
    monthlyExpenses: new FormControl('', [Validators.required,monthlyExpensesValidator]),
    // monthlyExpenses: new FormControl('', [Validators.required, this.validateExpenses.bind(this)]),
    dateOfBirth: new FormControl('', [Validators.required ,ageRangeValidator(21, 67)])
  })


  submit() {
    if (this.loanEligibility.valid) {
      this.userService.calculateMyLoanEligible(this.loanEligibility.value).subscribe((result) => {
        console.log(result);
        this.loanAmount = result;
        this.loanEligibilityAmount=true;
      })
    }
    else {
      this.loanEligibility.markAllAsTouched();
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
    const dateOfBirth = this.loanEligibility.get('dateOfBirth')?.value;
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





