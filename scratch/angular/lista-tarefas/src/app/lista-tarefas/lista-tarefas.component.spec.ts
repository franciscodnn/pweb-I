import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTarefasComponent } from './lista-tarefas.component';

describe('ListaTarefasComponent', () => {
  let component: ListaTarefasComponent;
  let fixture: ComponentFixture<ListaTarefasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTarefasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTarefasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
