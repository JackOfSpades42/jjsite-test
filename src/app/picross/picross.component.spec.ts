import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicrossComponent } from './picross.component';

describe('PicrossComponent', () => {
  let component: PicrossComponent;
  let fixture: ComponentFixture<PicrossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicrossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicrossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
