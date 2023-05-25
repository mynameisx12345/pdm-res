import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthCounsellingComponent } from './health-counselling.component';

describe('HealthCounsellingComponent', () => {
  let component: HealthCounsellingComponent;
  let fixture: ComponentFixture<HealthCounsellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthCounsellingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthCounsellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
