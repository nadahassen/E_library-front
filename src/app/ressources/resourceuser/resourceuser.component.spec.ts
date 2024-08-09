import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceuserComponent } from './resourceuser.component';

describe('ResourceuserComponent', () => {
  let component: ResourceuserComponent;
  let fixture: ComponentFixture<ResourceuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
