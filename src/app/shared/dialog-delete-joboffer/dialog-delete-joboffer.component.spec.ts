import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteJobofferComponent } from './dialog-delete-joboffer.component';

describe('DialogDeleteJobofferComponent', () => {
  let component: DialogDeleteJobofferComponent;
  let fixture: ComponentFixture<DialogDeleteJobofferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteJobofferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeleteJobofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
