import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreMovieComponent } from './explore-movie.component';

describe('ExploreMovieComponent', () => {
  let component: ExploreMovieComponent;
  let fixture: ComponentFixture<ExploreMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
