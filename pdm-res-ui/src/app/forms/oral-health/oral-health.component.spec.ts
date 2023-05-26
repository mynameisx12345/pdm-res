import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OralHealthComponent } from './oral-health.component';

describe('OralHealthComponent', () => {
  let component: OralHealthComponent;
  let fixture: ComponentFixture<OralHealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OralHealthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OralHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
