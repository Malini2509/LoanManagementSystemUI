import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminComponent } from './admin/admin.component';
import { ApplyLoanComponent } from './apply-loan/apply-loan.component';
import { ApproveLoanComponent } from './approve-loan/approve-loan.component';
import { CreditScoreComponent } from './credit-score/credit-score.component';
import { EmiCalculatorComponent } from './emi-calculator/emi-calculator.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoanEligibilityComponent } from './loan-eligibility/loan-eligibility.component';
import { LoanOfferComponent } from './loan-offer/loan-offer.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { TrackApplicationComponent } from './track-application/track-application.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'admin',component:AdminComponent, canActivate:[AuthGuard] , data:{roles:['Admin']}},
  // {path:'user/:id',component:UserComponent, canActivate:[AuthGuard] , data:{roles:['User']}},
  {path:'user',component:UserComponent, canActivate:[AuthGuard] , data:{roles:['User']}},
  {path:'login',component:LoginComponent},
  {path:'forbidden',component:ForbiddenComponent},
  { path: 'registration', component: RegistrationComponent },
  { path: 'credit-score/:id', component: CreditScoreComponent },
  {path:'emi-calculator' , component:EmiCalculatorComponent},
  {path:'loan-eligibility' , component:LoanEligibilityComponent},
  {path:'apply-loan' , component:ApplyLoanComponent},
  {path:'track-application' , component:TrackApplicationComponent},
  {path:'approve-loan' , component:ApproveLoanComponent},
  {path:'about-us' , component:AboutUsComponent},
  {path:'loan-offer' , component:LoanOfferComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
