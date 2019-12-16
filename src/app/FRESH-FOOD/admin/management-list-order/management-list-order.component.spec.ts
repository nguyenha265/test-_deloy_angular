import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementListOrderComponent } from './management-list-order.component';

describe('ManagementListOrderComponent', () => {
  let component: ManagementListOrderComponent;
  let fixture: ComponentFixture<ManagementListOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementListOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementListOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
