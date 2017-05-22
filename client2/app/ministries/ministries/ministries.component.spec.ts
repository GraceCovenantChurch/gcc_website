import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistriesComponent } from './ministries.component';

describe('MinistriesComponent', () => {
  let component: MinistriesComponent;
  let fixture: ComponentFixture<MinistriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinistriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinistriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
