import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
import { RegistrationComponent } from './registration/registration.component';
import { CreditScoreComponent } from './credit-score/credit-score.component';
import { EmiCalculatorComponent } from './emi-calculator/emi-calculator.component';
import { LoanEligibilityComponent } from './loan-eligibility/loan-eligibility.component';
import { ApplyLoanComponent } from './apply-loan/apply-loan.component';
import { TrackApplicationComponent } from './track-application/track-application.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApproveLoanComponent } from './approve-loan/approve-loan.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoanOfferComponent } from './loan-offer/loan-offer.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    RegistrationComponent,
    CreditScoreComponent,
    EmiCalculatorComponent,
    LoanEligibilityComponent,
    ApplyLoanComponent,
    TrackApplicationComponent,
    ApproveLoanComponent,
    AboutUsComponent,
    LoanOfferComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
