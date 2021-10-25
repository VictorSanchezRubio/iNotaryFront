import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SujetosComponent } from './sujetos.component';

describe('SujetosComponent', () => {
  let component: SujetosComponent;
  let fixture: ComponentFixture<SujetosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SujetosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SujetosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
