import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasRecientesComponent } from './citas-recientes.component';

describe('CitasRecientesComponent', () => {
  let component: CitasRecientesComponent;
  let fixture: ComponentFixture<CitasRecientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitasRecientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitasRecientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
