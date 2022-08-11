import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCloseContractComponent } from './dialog-close-contract.component';

describe('DialogCloseContractComponent', () => {
  let component: DialogCloseContractComponent;
  let fixture: ComponentFixture<DialogCloseContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCloseContractComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCloseContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
