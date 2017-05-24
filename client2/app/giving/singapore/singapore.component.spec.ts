import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingaporeComponent } from './singapore.component';

describe('SingaporeComponent', () => {
  let component: SingaporeComponent;
  let fixture: ComponentFixture<SingaporeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingaporeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingaporeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
