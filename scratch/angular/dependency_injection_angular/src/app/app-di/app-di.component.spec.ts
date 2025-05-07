import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDiComponent } from './app-di.component';

describe('AppDiComponent', () => {
  let component: AppDiComponent;
  let fixture: ComponentFixture<AppDiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
