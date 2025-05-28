import { Component, signal, model, computed } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

import { ContadorComponent } from './contador/contador.component';
import { FormBuilderComponent } from './form/form.component';
import { ValidationFormComponent } from './form-valiador-basico/form-valiador-basico.component';
import { CustomValidationComponent } from './form-valiador-customizado/form-valiador-customizado.component';

@Component({
  selector: 'app-root',
  imports: [ContadorComponent, FormBuilderComponent, UpperCasePipe, ValidationFormComponent, CustomValidationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'contador-app';
  status = signal('');
  count = model(0);

  novoValor = computed(() => {
    console.log(this.count() * 2);

    return this.count() * 2;
  });

  imagem = 'https://www.ifpb.edu.br/imagens/logotipos/ifpb-1';

  updateStatus(event: string) {
    this.status.set(event);
  }
}
