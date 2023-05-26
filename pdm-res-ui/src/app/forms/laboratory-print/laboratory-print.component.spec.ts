import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryPrintComponent } from './laboratory-print.component';

describe('LaboratoryPrintComponent', () => {
  let component: LaboratoryPrintComponent;
  let fixture: ComponentFixture<LaboratoryPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratoryPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
