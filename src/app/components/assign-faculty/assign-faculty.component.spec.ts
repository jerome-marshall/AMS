import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignFacultyComponent } from './assign-faculty.component';

describe('AssignFacultyComponent', () => {
  let component: AssignFacultyComponent;
  let fixture: ComponentFixture<AssignFacultyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignFacultyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
