import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalClearancePrintComponent } from './medical-clearance-print.component';

describe('MedicalClearancePrintComponent', () => {
  let component: MedicalClearancePrintComponent;
  let fixture: ComponentFixture<MedicalClearancePrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalClearancePrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalClearancePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
