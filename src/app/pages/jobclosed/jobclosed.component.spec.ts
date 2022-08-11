import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobclosedComponent } from './jobclosed.component';

describe('JobclosedComponent', () => {
  let component: JobclosedComponent;
  let fixture: ComponentFixture<JobclosedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobclosedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobclosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
