import { Component, signal, model, computed } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ContadorComponent } from './contador/contador.component';
import { FormBuilderComponent } from './form/form.component';

@Component({
  selector: 'app-root',
  imports: [ContadorComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'contador-app';
  status = signal('');
  count = model(0);
  
  // Propriedades do formulário
  contadorForm: FormGroup;
  nomeContador = signal('Contador');
  valorInicial = signal(0);
  passoIncremento = signal(1);

  constructor(private fb: FormBuilder) {
    this.contadorForm = this.fb.group({
      nome: ['Contador', [Validators.required, Validators.minLength(3)]],
      valorInicial: [0, [Validators.required, Validators.min(0)]],
      passo: [1, [Validators.required, Validators.min(1)]]
    });
  }

  novoValor = computed(() => {
    console.log(this.count() * 2);

    return this.count() * 2;
  });

  imagem = 'https://www.ifpb.edu.br/imagens/logotipos/ifpb-1';

  updateStatus(event: string) {
    this.status.set(event);
  }

  // Método para aplicar as configurações do formulário
  aplicarConfiguracoes() {
    if (this.contadorForm.valid) {
      const formValues = this.contadorForm.value;
      this.nomeContador.set(formValues.nome);
      this.valorInicial.set(formValues.valorInicial);
      this.passoIncremento.set(formValues.passo);
      this.count.set(formValues.valorInicial);
    }
  }

  // Getter para facilitar o acesso aos controles do formulário
  get formControls() {
    return this.contadorForm.controls;
  }
}
