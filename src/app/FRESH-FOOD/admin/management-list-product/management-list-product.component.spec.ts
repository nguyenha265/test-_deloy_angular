import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementListProductComponent } from './management-list-product.component';

describe('MamagementListProductComponent', () => {
  let component: ManagementListProductComponent;
  let fixture: ComponentFixture<ManagementListProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementListProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementListProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
