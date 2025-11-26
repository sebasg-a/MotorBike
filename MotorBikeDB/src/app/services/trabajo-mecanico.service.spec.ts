import { TestBed } from '@angular/core/testing';

import { TrabajoMecanicoService } from './trabajo-mecanico.service';

describe('TrabajoMecanicoService', () => {
  let service: TrabajoMecanicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrabajoMecanicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
