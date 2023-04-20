import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalPurposeComponent } from './medical-purpose.component';

describe('MedicalPurposeComponent', () => {
  let component: MedicalPurposeComponent;
  let fixture: ComponentFixture<MedicalPurposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalPurposeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalPurposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
