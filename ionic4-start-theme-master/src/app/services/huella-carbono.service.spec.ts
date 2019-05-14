import { TestBed } from '@angular/core/testing';

import { HuellaCarbonoService } from './huella-carbono.service';

describe('HuellaCarbonoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HuellaCarbonoService = TestBed.get(HuellaCarbonoService);
    expect(service).toBeTruthy();
  });
});
