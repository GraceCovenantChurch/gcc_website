import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistryCenterComponent } from './ministryCenter.component';

describe('MinistryCenterComponent', () => {
  let component: MinistryCenterComponent;
  let fixture: ComponentFixture<MinistryCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinistryCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinistryCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
