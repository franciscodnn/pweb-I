import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacaoCardComponent } from './notificacao-card.component';

describe('NotificacaoCardComponent', () => {
  let component: NotificacaoCardComponent;
  let fixture: ComponentFixture<NotificacaoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacaoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacaoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
