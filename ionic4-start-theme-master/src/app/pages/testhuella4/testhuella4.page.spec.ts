import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Testhuella4Page } from './testhuella4.page';

describe('Testhuella4Page', () => {
  let component: Testhuella4Page;
  let fixture: ComponentFixture<Testhuella4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Testhuella4Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Testhuella4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
