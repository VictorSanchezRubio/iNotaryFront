import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasesComparecienciaComponent } from './clases-compareciencia.component';

describe('ClasesComparecienciaComponent', () => {
  let component: ClasesComparecienciaComponent;
  let fixture: ComponentFixture<ClasesComparecienciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasesComparecienciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasesComparecienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
