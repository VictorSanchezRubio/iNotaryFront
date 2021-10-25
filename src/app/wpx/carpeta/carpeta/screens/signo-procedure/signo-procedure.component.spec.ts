import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoProcedureComponent } from './signo-procedure.component';

describe('SignoProcedureComponent', () => {
  let component: SignoProcedureComponent;
  let fixture: ComponentFixture<SignoProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignoProcedureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignoProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
