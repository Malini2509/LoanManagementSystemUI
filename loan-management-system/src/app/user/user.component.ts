import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  id: any;
  constructor(private route: Router, private activatedRoute: ActivatedRoute) { }
  navigateToCibilScoreComponent() {
    this.route.navigate(['/credit-score/' + this.id]);
  }

  navigateToEmiCalculatorComponent() {
    this.route.navigate(['emi-calculator']);
  }
  navigateToLoanEligibilityComponent() {
    this.route.navigate(['loan-eligibility']);
  }

  navigateToApplyLoanComponent() {
    this.route.navigate(['apply-loan']);
  }

  navigateToTrackApplicationComponent() {
    this.route.navigate(['track-application']);
  }
  ngOnInit() {
    // this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.id);
  }

  navigateToLoanOfferComponent(){
    this.route.navigate(['loan-offer']);
  }
}
