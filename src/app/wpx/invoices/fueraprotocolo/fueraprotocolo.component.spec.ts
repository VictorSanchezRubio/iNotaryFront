import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FueraprotocoloComponent } from './fueraprotocolo.component';

describe('FueraprotocoloComponent', () => {
  let component: FueraprotocoloComponent;
  let fixture: ComponentFixture<FueraprotocoloComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FueraprotocoloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FueraprotocoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
