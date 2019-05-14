import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateEneryPage } from './calculate-enery.page';

describe('CalculateEneryPage', () => {
  let component: CalculateEneryPage;
  let fixture: ComponentFixture<CalculateEneryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculateEneryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateEneryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
