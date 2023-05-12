/*****************************************************************************
 * @Author                : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @CreatedDate           : 2023-05-11 15:25:47                              *
 * @LastEditors           : Jbristhuille<jean-baptiste@halfsquare.fr>        *
 * @LastEditDate          : 2023-05-11 16:34:00                              *
 ****************************************************************************/

/* SUMMARY
  * Imports
  * Components
*/

/* Imports */
import { ComponentFixture, TestBed } from '@angular/core/testing';
/***/

/* Components */
import { TicketsComponent } from "./tickets.component";
/***/

describe('ProjectsComponent', () => {
  let component: TicketsComponent;
  let fixture: ComponentFixture<TicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
