import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeliefsComponent } from './beliefs.component';

describe('BeliefsComponent', () => {
  let component: BeliefsComponent;
  let fixture: ComponentFixture<BeliefsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeliefsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeliefsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
