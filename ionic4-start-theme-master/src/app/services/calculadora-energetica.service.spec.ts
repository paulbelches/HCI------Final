import { TestBed } from '@angular/core/testing';

import { CalculadoraEnergeticaService } from './calculadora-energetica.service';

describe('CalculadoraEnergeticaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalculadoraEnergeticaService = TestBed.get(CalculadoraEnergeticaService);
    expect(service).toBeTruthy();
  });
});
