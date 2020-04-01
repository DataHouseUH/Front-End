import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotPrequalComponent } from './not-prequal.component';

describe('NotPrequalComponent', () => {
  let component: NotPrequalComponent;
  let fixture: ComponentFixture<NotPrequalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotPrequalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotPrequalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
