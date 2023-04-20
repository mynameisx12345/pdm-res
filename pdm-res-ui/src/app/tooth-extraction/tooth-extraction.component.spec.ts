import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToothExtractionComponent } from './tooth-extraction.component';

describe('ToothExtractionComponent', () => {
  let component: ToothExtractionComponent;
  let fixture: ComponentFixture<ToothExtractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToothExtractionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToothExtractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
