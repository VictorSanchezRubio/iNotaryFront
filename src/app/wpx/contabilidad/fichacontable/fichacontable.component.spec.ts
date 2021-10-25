import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichacontableComponent } from './fichacontable.component';

describe('FichacontableComponent', () => {
  let component: FichacontableComponent;
  let fixture: ComponentFixture<FichacontableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichacontableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichacontableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
