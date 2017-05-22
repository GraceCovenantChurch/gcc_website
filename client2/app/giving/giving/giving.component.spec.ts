import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GivingComponent } from './giving.component';

describe('GivingComponent', () => {
  let component: GivingComponent;
  let fixture: ComponentFixture<GivingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GivingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
