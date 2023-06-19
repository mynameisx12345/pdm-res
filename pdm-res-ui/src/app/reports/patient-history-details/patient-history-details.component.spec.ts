import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHistoryDetailsComponent } from './patient-history-details.component';

describe('PatientHistoryDetailsComponent', () => {
  let component: PatientHistoryDetailsComponent;
  let fixture: ComponentFixture<PatientHistoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientHistoryDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
