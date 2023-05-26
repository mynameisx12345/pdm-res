import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefusalPrintComponent } from './refusal-print.component';

describe('RefusalPrintComponent', () => {
  let component: RefusalPrintComponent;
  let fixture: ComponentFixture<RefusalPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefusalPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefusalPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
