import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsSectionComponent } from './labels-section.component';

describe('LabelsSectionComponent', () => {
  let component: LabelsSectionComponent;
  let fixture: ComponentFixture<LabelsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelsSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
