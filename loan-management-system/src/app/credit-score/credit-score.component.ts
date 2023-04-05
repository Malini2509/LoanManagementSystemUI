import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-credit-score',
  templateUrl: './credit-score.component.html',
  styleUrls: ['./credit-score.component.css']
})
export class CreditScoreComponent {
  id: any;
  creditScore: any;

  userDetails = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    dateOfBirth: new FormControl('', Validators.required),
    panCardNumber: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required)
  })
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  onSubmit() {
    if (this.userDetails.valid) {
      this.userService.creditScore(this.userDetails.value).subscribe((result) => {
        console.log(this.userDetails.value);
        console.log(result);
        this.creditScore = result;
      })
    } else {
      this.userDetails.markAllAsTouched();
    }

  }

  getMaxDate(): string {
    const today = new Date();
    return `${today.getFullYear()}-${this.addZero(today.getMonth() + 1)}-${this.addZero(today.getDate())}`;
  }

  addZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  isDateAfterToday(): boolean {
    const dateOfBirth = this.userDetails.get('dateOfBirth')?.value;
    if (dateOfBirth) {
      const today = new Date();
      return new Date(dateOfBirth) > new Date(`${today.getFullYear()}-${this.addZero(today.getMonth() + 1)}-${this.addZero(today.getDate())}`);
    }
    return false;
  }
}
