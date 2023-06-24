import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjetComponent } from './view-projet.component';

describe('ViewProjetComponent', () => {
  let component: ViewProjetComponent;
  let fixture: ComponentFixture<ViewProjetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProjetComponent]
    });
    fixture = TestBed.createComponent(ViewProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
