import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePreviewInputComponent } from './image-preview-input.component';

describe('ImgPreviewInputComponent', () => {
  let component: ImagePreviewInputComponent;
  let fixture: ComponentFixture<ImagePreviewInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagePreviewInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePreviewInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
