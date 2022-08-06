import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogJobofferComponent } from './dialog-joboffer.component';

describe('DialogJobofferComponent', () => {
  let component: DialogJobofferComponent;
  let fixture: ComponentFixture<DialogJobofferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogJobofferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogJobofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
