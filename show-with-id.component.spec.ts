import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWithIdComponent } from './show-with-id.component';

describe('ShowWithIdComponent', () => {
  let component: ShowWithIdComponent;
  let fixture: ComponentFixture<ShowWithIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowWithIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowWithIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
