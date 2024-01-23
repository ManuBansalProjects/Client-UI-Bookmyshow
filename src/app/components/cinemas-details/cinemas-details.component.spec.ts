import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemasDetailsComponent } from './cinemas-details.component';

describe('CinemasDetailsComponent', () => {
  let component: CinemasDetailsComponent;
  let fixture: ComponentFixture<CinemasDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CinemasDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinemasDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
