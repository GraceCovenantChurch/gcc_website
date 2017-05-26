import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgPreviewInputComponent } from './img-preview-input.component';

describe('ImgPreviewInputComponent', () => {
  let component: ImgPreviewInputComponent;
  let fixture: ComponentFixture<ImgPreviewInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgPreviewInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgPreviewInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
