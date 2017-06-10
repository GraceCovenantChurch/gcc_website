import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmiComponent } from './ami.component';

describe('AmiComponent', () => {
  let component: AmiComponent;
  let fixture: ComponentFixture<AmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
