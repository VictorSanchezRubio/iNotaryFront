import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparecientesComponent } from './comparecientes.component';

describe('ComparecientesComponent', () => {
  let component: ComparecientesComponent;
  let fixture: ComponentFixture<ComparecientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparecientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparecientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
