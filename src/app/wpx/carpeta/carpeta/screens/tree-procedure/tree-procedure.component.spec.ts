import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeProcedureComponent } from './tree-procedure.component';

describe('TreeProcedureComponent', () => {
  let component: TreeProcedureComponent;
  let fixture: ComponentFixture<TreeProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeProcedureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
