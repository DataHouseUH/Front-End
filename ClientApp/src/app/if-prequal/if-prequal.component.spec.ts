import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IfPrequalComponent } from './if-prequal.component';

describe('IfPrequalComponent', () => {
  let component: IfPrequalComponent;
  let fixture: ComponentFixture<IfPrequalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IfPrequalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IfPrequalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
