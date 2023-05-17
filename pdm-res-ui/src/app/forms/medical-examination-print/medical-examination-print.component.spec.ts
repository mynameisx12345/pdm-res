import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalExaminationPrintComponent } from './medical-examination-print.component';

describe('MedicalExaminationPrintComponent', () => {
  let component: MedicalExaminationPrintComponent;
  let fixture: ComponentFixture<MedicalExaminationPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalExaminationPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalExaminationPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
