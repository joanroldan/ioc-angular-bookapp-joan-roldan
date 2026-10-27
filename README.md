# ioc-angular-bookapp-joan-roldan

Aplicació Angular per gestionar i consultar un catàleg de llibres.

## Versions i entorn

- Node.js: v24.21.0
- Angular CLI: v22.2.0
- Angular: v22.2.0
- Gestor de paquets: npm

## Instal·lació i execució

```bash
git clone https://github.com/joanroldan/ioc-angular-bookapp-joan-roldan.git
cd ioc-angular-bookapp-joan-roldan
npm install
npm start
```

L'aplicació estarà disponible a `http://localhost:4200/`.

També es pot iniciar amb:

```bash
ng serve
```

## Comandes principals

Compilar el projecte:

```bash
npm run build
```

Executar les proves:

```bash
npm test
```

## Components creats

- `BookFilterComponent`: formulari per filtrar per text, categoria i llibres destacats.
- `BookListComponent`: mostra la llista de llibres filtrats.
- `BookCardComponent`: mostra el resum d'un llibre i permet seleccionar-lo.
- `CategoryBadgeComponent`: mostra la categoria i el distintiu “Destacat”.

La comunicació entre components utilitza `@Input`, `@Output` i `EventEmitter`.

## Branca de lliurament

El lliurament final es publica a la branca:

```text
ra2-components
```
