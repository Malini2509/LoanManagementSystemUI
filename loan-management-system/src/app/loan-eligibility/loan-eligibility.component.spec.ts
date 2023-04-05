import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanEligibilityComponent } from './loan-eligibility.component';

describe('LoanEligibilityComponent', () => {
  let component: LoanEligibilityComponent;
  let fixture: ComponentFixture<LoanEligibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanEligibilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanEligibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
