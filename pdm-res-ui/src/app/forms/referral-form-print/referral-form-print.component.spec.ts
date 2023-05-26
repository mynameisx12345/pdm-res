import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralFormPrintComponent } from './referral-form-print.component';

describe('ReferralFormPrintComponent', () => {
  let component: ReferralFormPrintComponent;
  let fixture: ComponentFixture<ReferralFormPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralFormPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferralFormPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
