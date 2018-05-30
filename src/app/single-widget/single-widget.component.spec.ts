import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleWidgetComponent } from './single-widget.component';

describe('SingleWidgetComponent', () => {
  let component: SingleWidgetComponent;
  let fixture: ComponentFixture<SingleWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
