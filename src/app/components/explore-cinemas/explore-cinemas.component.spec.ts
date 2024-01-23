import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreCinemasComponent } from './explore-cinemas.component';

describe('ExploreCinemasComponent', () => {
  let component: ExploreCinemasComponent;
  let fixture: ComponentFixture<ExploreCinemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreCinemasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreCinemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
