import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsDetailsComponent } from './labels-details.component';

describe('LabelsDetailsComponent', () => {
  let component: LabelsDetailsComponent;
  let fixture: ComponentFixture<LabelsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
