import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetStudentComponent } from './projet-student.component';

describe('ProjetStudentComponent', () => {
  let component: ProjetStudentComponent;
  let fixture: ComponentFixture<ProjetStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjetStudentComponent]
    });
    fixture = TestBed.createComponent(ProjetStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
