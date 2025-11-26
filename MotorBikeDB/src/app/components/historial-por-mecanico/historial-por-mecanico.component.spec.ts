import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialPorMecanicoComponent } from './historial-por-mecanico.component';

describe('HistorialPorMecanicoComponent', () => {
  let component: HistorialPorMecanicoComponent;
  let fixture: ComponentFixture<HistorialPorMecanicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialPorMecanicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialPorMecanicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
