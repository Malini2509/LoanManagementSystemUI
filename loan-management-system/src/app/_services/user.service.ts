import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cities } from '../loan-eligibility/cities.model';
import { LoanOfferFilter } from '../loan-offer/loan-offer-filter.model';
import { loanOffers } from '../loan-offer/loan-offer.model';
import { loanApplication } from '../track-application/loanapplication.model';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  PATH_OF_API = "http://localhost:8080";
  requestHeader = new HttpHeaders(
    { "No-Auth": "True" }
  );

  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) { }


  public login(loginData: any) {
    return this.httpClient.post(this.PATH_OF_API + "/authenticate", loginData, { headers: this.requestHeader })
  }

  public registeredUser(registerData: any) {
    return this.httpClient.post(this.PATH_OF_API + "/register-new-user", registerData, { headers: this.requestHeader })
  }

  public forUser() {
    return this.httpClient.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.httpClient.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
    });
  }

  public roleMatch(allowedRoles: any): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;

          }
        }
      }
    }
    return isMatch;
  }

  public creditScore(creditData: any) {
    return this.httpClient.post(this.PATH_OF_API + "/check-cibil", creditData, { headers: this.requestHeader })
  }

  public emiCalculator(emiData: any) {
    return this.httpClient.post(this.PATH_OF_API + "/emi-calculator", emiData)
  }

  public getCities(): Observable<cities[]> {
    return this.httpClient.get<cities[]>(this.PATH_OF_API + "/get-cities");
  }

  public calculateMyLoanEligible(data: any) {
    return this.httpClient.post(this.PATH_OF_API + "/calculate-my-loan-eligible", data, { headers: this.requestHeader })
  }

  public applyForLoan(loan: any) {
    return this.httpClient.post(this.PATH_OF_API + "/apply-loan", loan, { headers: this.requestHeader , responseType :'text' })
  }
  public getLoanApplicationStatus(loanId: string): Observable<loanApplication> {
    return this.httpClient.post<loanApplication>(this.PATH_OF_API + "/my-application-status", loanId);
  }

  public listAllLoanApplication(){
    return this.httpClient.get(this.PATH_OF_API + "/list-loan-application")
  }

  public approveLoan(loanId: string) {
    return this.httpClient.post(this.PATH_OF_API + `/approveLoan/loanid/${loanId}`,{}, { headers: this.requestHeader });
  }

  public getAllOffers(): Observable<loanOffers[]>{
    return this.httpClient.get<loanOffers[]>(this.PATH_OF_API + "/list-offers")
  }

   public filterLoanOffers(loanAmount: number, tenure: number, rateOfInterest: number):Observable<loanOffers> {
    const params = new HttpParams()
      .set('loanAmount', loanAmount.toString())
      .set('tenure', tenure.toString())
      .set('rateOfIntrest', rateOfInterest.toString());
      console.log(this.PATH_OF_API + "/filter-offer", { params })

    return this.httpClient.get<loanOffers>(this.PATH_OF_API + "/filter-offer", { params, headers: this.requestHeader });
  }
}
