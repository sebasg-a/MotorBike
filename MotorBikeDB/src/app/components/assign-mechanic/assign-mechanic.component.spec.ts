import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignMechanicComponent } from './assign-mechanic.component';

describe('AssignMechanicComponent', () => {
  let component: AssignMechanicComponent;
  let fixture: ComponentFixture<AssignMechanicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignMechanicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignMechanicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
