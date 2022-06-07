import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOfferPageComponent } from './job-offer-page.component';

describe('JobOfferPageComponent', () => {
  let component: JobOfferPageComponent;
  let fixture: ComponentFixture<JobOfferPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobOfferPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOfferPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
