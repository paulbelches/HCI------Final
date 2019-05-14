import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Testhuella3Page } from './testhuella3.page';

describe('Testhuella3Page', () => {
  let component: Testhuella3Page;
  let fixture: ComponentFixture<Testhuella3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Testhuella3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Testhuella3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
