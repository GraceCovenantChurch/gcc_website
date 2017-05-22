import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImnewComponent } from './imnew.component';

describe('ImnewComponent', () => {
  let component: ImnewComponent;
  let fixture: ComponentFixture<ImnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
