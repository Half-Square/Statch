import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigneeSectionComponent } from './assignee-section.component';

describe('AssigneeSectionComponent', () => {
  let component: AssigneeSectionComponent;
  let fixture: ComponentFixture<AssigneeSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssigneeSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssigneeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
