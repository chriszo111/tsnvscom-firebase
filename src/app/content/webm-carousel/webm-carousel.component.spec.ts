import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebmCarouselComponent } from './webm-carousel.component';

describe('WebmCarouselComponent', () => {
  let component: WebmCarouselComponent;
  let fixture: ComponentFixture<WebmCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebmCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebmCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
