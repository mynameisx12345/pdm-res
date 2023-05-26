import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefusalComponent } from './refusal.component';

describe('RefusalComponent', () => {
  let component: RefusalComponent;
  let fixture: ComponentFixture<RefusalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefusalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefusalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
