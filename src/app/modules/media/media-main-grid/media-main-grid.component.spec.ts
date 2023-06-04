import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaMainGridComponent } from './media-main-grid.component';

describe('MediaMainGridComponent', () => {
  let component: MediaMainGridComponent;
  let fixture: ComponentFixture<MediaMainGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaMainGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaMainGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
