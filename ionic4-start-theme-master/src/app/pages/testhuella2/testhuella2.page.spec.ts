import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Testhuella2Page } from './testhuella2.page';

describe('Testhuella2Page', () => {
  let component: Testhuella2Page;
  let fixture: ComponentFixture<Testhuella2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Testhuella2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Testhuella2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
