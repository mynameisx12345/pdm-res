import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OralHealthPrintComponent } from './oral-health-print.component';

describe('OralHealthPrintComponent', () => {
  let component: OralHealthPrintComponent;
  let fixture: ComponentFixture<OralHealthPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OralHealthPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OralHealthPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
