import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CobonesComponent } from './cobones.component';

describe('CobonesComponent', () => {
  let component: CobonesComponent;
  let fixture: ComponentFixture<CobonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CobonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CobonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
