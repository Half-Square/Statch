/*****************************************************************************
 * @Author                : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @CreatedDate           : 2023-03-21 19:27:36                              *
 * @LastEditors           : Adrien Lanco<adrienlanco0@gmail.com>             *
 * @LastEditDate          : 2023-03-21 19:27:36                              *
 ****************************************************************************/

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusLabeledComponent } from './status-labeled.component';

describe('StatusComponent', () => {
  let component: StatusLabeledComponent;
  let fixture: ComponentFixture<StatusLabeledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusLabeledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusLabeledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
