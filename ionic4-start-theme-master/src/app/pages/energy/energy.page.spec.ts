import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyPage } from './energy.page';

describe('EnergyPage', () => {
  let component: EnergyPage;
  let fixture: ComponentFixture<EnergyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnergyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
