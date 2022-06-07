import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobofferInfoComponent } from './joboffer-info.component';

describe('JobofferInfoComponent', () => {
  let component: JobofferInfoComponent;
  let fixture: ComponentFixture<JobofferInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobofferInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobofferInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
