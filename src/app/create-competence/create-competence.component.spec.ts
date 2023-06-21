import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompetenceComponent } from './create-competence.component';

describe('CreateCompetenceComponent', () => {
  let component: CreateCompetenceComponent;
  let fixture: ComponentFixture<CreateCompetenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCompetenceComponent]
    });
    fixture = TestBed.createComponent(CreateCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
