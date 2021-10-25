import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoCarpetaComponent } from './signo-carpeta.component';

describe('SignoCarpetaComponent', () => {
  let component: SignoCarpetaComponent;
  let fixture: ComponentFixture<SignoCarpetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignoCarpetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignoCarpetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
