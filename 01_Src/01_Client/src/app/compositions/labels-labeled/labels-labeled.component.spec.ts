import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsLabeledComponent } from './labels-labeled.component';

describe('LabelsLabeledComponent', () => {
  let component: LabelsLabeledComponent;
  let fixture: ComponentFixture<LabelsLabeledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelsLabeledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelsLabeledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
