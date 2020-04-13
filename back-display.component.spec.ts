import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackDisplayComponent } from './back-display.component';

describe('BackDisplayComponent', () => {
  let component: BackDisplayComponent;
  let fixture: ComponentFixture<BackDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
