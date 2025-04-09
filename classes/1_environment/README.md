[main](../../README.md)
# Aula 1 - Preparação do ambiente

## Instalação

**TypeScript localmente em um projeto específico**
```bash
npm install typescript --save-dev
```

Para compilar o (hipotético) arquivo *index.ts*
```bash
npx tsc index.ts

# será gerado um arquivo index.js
```

OU

**TypeScript global**
```bash
npm install -g typescript
```

Para compilar o (hipotético) arquivo *index.ts*
```bash
# a partir de qualquer pasta no terminal

tsc index.ts

# será gerado um arquivo index.js
```

## Pacotes adicionais
**@types/node**, **ts-node**, **tsx**
```bash
npm install --save-dev @types/node ts-node tsx
```
**ts-node** e **tsx** permitem executar TypeScript diretamente no Node.js (sem compilar manualmente).

```bash
# execução do arquivo index.ts

npx tsx index.ts
```

O pacote tsx pode ser instalado globalmente
```bash
npm install -g tsx

# tsx index.ts (se existir o arquivo index.ts na pasta)
```

## Arquivo de configuração TypeScript

O arquivo de configuração do TypeScript é o *tsconfig.json*.
```bash
npx tsc --init

# arquivo tsconfig.json criado
```

Trecho do arquivo *tsconfig.json*.
```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */
    /* ... */

    /* Language and Environment */
    "target": "es6",
    /* ... */

    /* Modules */
    "module": "es6",
    /* ... */
  },
}
```
O arquivo *tsconfig.json* permite configurar, dentre outros, os diretórios de saída dos arquivos compilados (arquivos *.js) e especificar quais arquivos serão compilados.

Opcionalmente, você pode informar o seu arquivo de configuração do TypeScript na compilação.
```bash
npx tsc -p tsconfig.json
```

**Configurando diretório de saída** dos arquivos compilados (ts -> js)
```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */
    /* ... */

    /* Emit */
    "outDir": "./dist",
  },
}
```

**Especificando arquivos \*.ts** para compilação
```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */
    /* ... */
  }, // término do objeto compilerOptions

  "include": ["index.ts"],
  // "exclude": ["node_modules"] // Excluir a pasta ./node_modules
}
```