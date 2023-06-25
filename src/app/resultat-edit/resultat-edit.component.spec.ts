import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatEditComponent } from './resultat-edit.component';

describe('ResultatEditComponent', () => {
  let component: ResultatEditComponent;
  let fixture: ComponentFixture<ResultatEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultatEditComponent]
    });
    fixture = TestBed.createComponent(ResultatEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
