import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentalPurposeComponent } from './dental-purpose.component';

describe('DentalPurposeComponent', () => {
  let component: DentalPurposeComponent;
  let fixture: ComponentFixture<DentalPurposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DentalPurposeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DentalPurposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
