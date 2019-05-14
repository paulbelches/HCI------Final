import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Testhuella6Page } from './testhuella6.page';

describe('Testhuella6Page', () => {
  let component: Testhuella6Page;
  let fixture: ComponentFixture<Testhuella6Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Testhuella6Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Testhuella6Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
