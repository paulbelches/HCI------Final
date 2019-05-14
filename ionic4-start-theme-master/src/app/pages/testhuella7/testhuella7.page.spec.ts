import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Testhuella7Page } from './testhuella7.page';

describe('Testhuella7Page', () => {
  let component: Testhuella7Page;
  let fixture: ComponentFixture<Testhuella7Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Testhuella7Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Testhuella7Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
