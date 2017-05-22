import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilygroupComponent } from './familygroup.component';

describe('FamilygroupComponent', () => {
  let component: FamilygroupComponent;
  let fixture: ComponentFixture<FamilygroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilygroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilygroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
