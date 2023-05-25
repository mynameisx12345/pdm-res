import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryConsultationComponent } from './summary-consultation.component';

describe('SummaryConsultationComponent', () => {
  let component: SummaryConsultationComponent;
  let fixture: ComponentFixture<SummaryConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryConsultationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
