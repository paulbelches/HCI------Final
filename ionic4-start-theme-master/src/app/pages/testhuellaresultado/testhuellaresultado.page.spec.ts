import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesthuellaresultadoPage } from './testhuellaresultado.page';

describe('TesthuellaresultadoPage', () => {
  let component: TesthuellaresultadoPage;
  let fixture: ComponentFixture<TesthuellaresultadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesthuellaresultadoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesthuellaresultadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
