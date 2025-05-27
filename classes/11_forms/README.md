[main](../../README.md)


# Aula 11 - Formulários em Angular v19

## Introdução

Os formulários são uma parte essencial de qualquer aplicação web. No Angular v19, temos duas abordagens principais para trabalhar com formulários:
- **Template-driven forms**: Baseados em templates
- **Reactive forms**: Baseados em código TypeScript (recomendado)

## 1. Configuração Inicial

Para usar formulários reativos, você precisa importar o `ReactiveFormsModule`:

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    // outros providers
  ]
};
```

```typescript
// component.ts
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  // template e styles
})
export class FormComponent {
  // lógica do componente
}
```

## 2. Formulários Reativos Básicos

### FormControl Simples

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-simple-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div>
      <label for="name">Nome:</label>
      <input id="name" type="text" [formControl]="nameControl">
      <p>Valor atual: {{ nameControl.value }}</p>
    </div>
  `
})
export class SimpleFormComponent {
  nameControl = new FormControl('');
}
```

### FormGroup com Múltiplos Campos

```typescript
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="name">Nome:</label>
        <input id="name" type="text" formControlName="name">
      </div>
      
      <div>
        <label for="email">Email:</label>
        <input id="email" type="email" formControlName="email">
      </div>
      
      <div>
        <label for="age">Idade:</label>
        <input id="age" type="number" formControlName="age">
      </div>
      
      <button type="submit" [disabled]="!userForm.valid">Enviar</button>
    </form>
    
    <div>
      <h3>Valores do Formulário:</h3>
      <pre>{{ userForm.value | json }}</pre>
    </div>
  `
})
export class UserFormComponent {
  userForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    age: new FormControl(0)
  });

  onSubmit() {
    console.log('Dados do formulário:', this.userForm.value);
  }
}
```

## 3. Formulários Tipados (Typed Forms)

O Angular v19 oferece suporte completo a formulários tipados para melhor IntelliSense e segurança de tipos:

```typescript
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

interface UserForm {
  name: string;
  email: string;
  age: number;
  address: {
    street: string;
    city: string;
  };
}

@Component({
  selector: 'app-typed-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="name">Nome:</label>
        <input id="name" type="text" formControlName="name">
      </div>
      
      <div>
        <label for="email">Email:</label>
        <input id="email" type="email" formControlName="email">
      </div>
      
      <div>
        <label for="age">Idade:</label>
        <input id="age" type="number" formControlName="age">
      </div>
      
      <div formGroupName="address">
        <h3>Endereço</h3>
        <div>
          <label for="street">Rua:</label>
          <input id="street" type="text" formControlName="street">
        </div>
        
        <div>
          <label for="city">Cidade:</label>
          <input id="city" type="text" formControlName="city">
        </div>
      </div>
      
      <button type="submit">Enviar</button>
    </form>
  `
})
export class TypedFormComponent {
  userForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true }),
    email: new FormControl<string>('', { nonNullable: true }),
    age: new FormControl<number>(0, { nonNullable: true }),
    address: new FormGroup({
      street: new FormControl<string>('', { nonNullable: true }),
      city: new FormControl<string>('', { nonNullable: true })
    })
  });

  onSubmit() {
    // O TypeScript agora conhece os tipos exatos
    const formValue = this.userForm.value;
    console.log('Nome:', formValue.name); // string
    console.log('Idade:', formValue.age); // number
  }
}
```

## 4. Validação de Formulários

### Validadores Básicos

```typescript
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-validation-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="validationForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="name">Nome (obrigatório):</label>
        <input id="name" type="text" formControlName="name">
        @if (name?.invalid && name?.touched) {
          <div class="error">
            @if (name?.errors?.['required']) {
              <div>Nome é obrigatório</div>
            }
            @if (name?.errors?.['minlength']) {
              <div>Nome deve ter pelo menos 2 caracteres</div>
            }
          </div>
        }
      </div>
      
      <div>
        <label for="email">Email:</label>
        <input id="email" type="email" formControlName="email">
        @if (email?.invalid && email?.touched) {
          <div class="error">
            @if (email?.errors?.['required']) {
              <div>Email é obrigatório</div>
            }
            @if (email?.errors?.['email']) {
              <div>Email deve ter formato válido</div>
            }
          </div>
        }
      </div>
      
      <div>
        <label for="age">Idade:</label>
        <input id="age" type="number" formControlName="age">
        @if (age?.invalid && age?.touched) {
          <div class="error">
            @if (age?.errors?.['min']) {
              <div>Idade mínima é 18 anos</div>
            }
            @if (age?.errors?.['max']) {
              <div>Idade máxima é 100 anos</div>
            }
          </div>
        }
      </div>
      
      <button type="submit" [disabled]="validationForm.invalid">
        Enviar
      </button>
    </form>
    
    <div>
      <p>Status do formulário: {{ validationForm.status }}</p>
      <p>Formulário válido: {{ validationForm.valid }}</p>
    </div>
  `,
  styles: [`
    .error {
      color: red;
      font-size: 0.8em;
      margin-top: 0.25rem;
    }
  `]
})
export class ValidationFormComponent {
  validationForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    age: new FormControl(0, [
      Validators.min(18),
      Validators.max(100)
    ])
  });

  get name() { return this.validationForm.get('name'); }
  get email() { return this.validationForm.get('email'); }
  get age() { return this.validationForm.get('age'); }

  onSubmit() {
    if (this.validationForm.valid) {
      console.log('Formulário válido:', this.validationForm.value);
    } else {
      console.log('Formulário inválido');
      this.validationForm.markAllAsTouched();
    }
  }
}
```

### Validador Customizado

```typescript
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validador customizado para CPF
export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cpf = control.value;
    if (!cpf) return null;
    
    // Lógica simplificada de validação de CPF
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const valid = cpfRegex.test(cpf);
    
    return valid ? null : { cpfInvalid: true };
  };
}

// Uso no componente
@Component({
  selector: 'app-custom-validation',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="customForm">
      <div>
        <label for="cpf">CPF:</label>
        <input id="cpf" type="text" formControlName="cpf" placeholder="000.000.000-00">
        @if (cpf?.invalid && cpf?.touched) {
          <div class="error">
            @if (cpf?.errors?.['cpfInvalid']) {
              <div>CPF deve ter formato válido</div>
            }
          </div>
        }
      </div>
    </form>
  `
})
export class CustomValidationComponent {
  customForm = new FormGroup({
    cpf: new FormControl('', [cpfValidator()])
  });

  get cpf() { return this.customForm.get('cpf'); }
}
```

## 5. Formulários Dinâmicos

```typescript
import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

interface Question {
  key: string;
  label: string;
  type: 'text' | 'email' | 'number';
  required: boolean;
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="dynamicForm" (ngSubmit)="onSubmit()">
      @for (question of questions; track question.key) {
        <div>
          <label [for]="question.key">
            {{ question.label }}
            @if (question.required) {
              <span class="required">*</span>
            }
          </label>
          <input 
            [id]="question.key"
            [type]="question.type"
            [formControlName]="question.key">
          
          @if (getControl(question.key)?.invalid && getControl(question.key)?.touched) {
            <div class="error">
              Campo obrigatório
            </div>
          }
        </div>
      }
      
      <div>
        <h3>Habilidades</h3>
        <div formArrayName="skills">
          @for (skill of skillsArray.controls; track $index; let i = $index) {
            <div>
              <input [formControlName]="i" placeholder="Habilidade {{ i + 1 }}">
              <button type="button" (click)="removeSkill(i)">Remover</button>
            </div>
          }
        </div>
        <button type="button" (click)="addSkill()">Adicionar Habilidade</button>
      </div>
      
      <button type="submit" [disabled]="dynamicForm.invalid">Enviar</button>
    </form>
    
    <div>
      <h3>Valores:</h3>
      <pre>{{ dynamicForm.value | json }}</pre>
    </div>
  `,
  styles: [`
    .required { color: red; }
    .error { color: red; font-size: 0.8em; }
    div { margin: 1rem 0; }
  `]
})
export class DynamicFormComponent {
  questions: Question[] = [
    { key: 'name', label: 'Nome', type: 'text', required: true },
    { key: 'email', label: 'Email', type: 'email', required: true },
    { key: 'age', label: 'Idade', type: 'number', required: false }
  ];

  dynamicForm: FormGroup;

  constructor() {
    this.dynamicForm = this.createForm();
  }

  createForm(): FormGroup {
    const group: any = {};
    
    // Adiciona controles baseados nas questões
    this.questions.forEach(question => {
      group[question.key] = question.required 
        ? new FormControl('', Validators.required)
        : new FormControl('');
    });
    
    // Adiciona FormArray para habilidades
    group['skills'] = new FormArray([
      new FormControl(''),
      new FormControl('')
    ]);
    
    return new FormGroup(group);
  }

  get skillsArray(): FormArray {
    return this.dynamicForm.get('skills') as FormArray;
  }

  addSkill(): void {
    this.skillsArray.push(new FormControl(''));
  }

  removeSkill(index: number): void {
    this.skillsArray.removeAt(index);
  }

  getControl(key: string) {
    return this.dynamicForm.get(key);
  }

  onSubmit(): void {
    if (this.dynamicForm.valid) {
      console.log('Formulário dinâmico:', this.dynamicForm.value);
    }
  }
}
```

## 6. FormBuilder (Alternativa Mais Limpa)

```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="firstName">Nome:</label>
        <input id="firstName" type="text" formControlName="firstName">
      </div>
      
      <div>
        <label for="lastName">Sobrenome:</label>
        <input id="lastName" type="text" formControlName="lastName">
      </div>
      
      <div formGroupName="address">
        <h3>Endereço</h3>
        <label for="street">Rua:</label>
        <input id="street" type="text" formControlName="street">
        
        <label for="city">Cidade:</label>
        <input id="city" type="text" formControlName="city">
      </div>
      
      <button type="submit">Salvar</button>
    </form>
  `
})
export class FormBuilderComponent {
  private fb = inject(FormBuilder);

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: ['']
    })
  });

  onSubmit(): void {
    console.log('Profile:', this.profileForm.value);
  }
}
```

## 7. Melhores Práticas

### 1. Use Formulários Reativos
- Mais testáveis e previsíveis
- Melhor controle sobre validação
- Suporte completo a TypeScript

### 2. Validação
- Valide tanto no cliente quanto no servidor
- Use validadores customizados para regras específicas
- Forneça feedback claro ao usuário

### 3. Performance
- Use `OnPush` change detection strategy quando possível
- Considere usar `debounceTime` para validações assíncronas

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <input [formControl]="searchControl" placeholder="Buscar...">
    <div>Resultado: {{ searchResult }}</div>
  `
})
export class SearchComponent {
  searchControl = new FormControl('');
  searchResult = '';

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.performSearch(value || '');
      });
  }

  performSearch(term: string): void {
    // Lógica de busca
    this.searchResult = `Buscando por: ${term}`;
  }
}
```

## Resumo

Os formulários reativos no Angular v19 oferecem:
- **Type Safety**: Formulários totalmente tipados
- **Validação Robusta**: Validadores built-in e customizados
- **Flexibilidade**: Formulários dinâmicos e complexos
- **Performance**: Controle fino sobre mudanças
- **Testabilidade**: Fácil de testar unitariamente

Use essa abordagem para criar formulários robustos e maintíveis em suas aplicações Angular.