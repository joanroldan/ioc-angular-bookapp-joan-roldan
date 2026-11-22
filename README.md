# ioc-angular-bookapp-joan-roldan

Aplicació Angular per gestionar i consultar un catàleg de llibres mitjançant una API local JSON.

## Versions i entorn

- Node.js: v24.21.0
- Angular CLI: v22.2.0
- Angular: v22.2.0
- npm: v11.19.0
- Gestor de paquets: npm
- API: `json-server` v1.0.0-beta.15

## Instal·lació i execució

```bash
git clone https://github.com/joanroldan/ioc-angular-bookapp-joan-roldan.git
cd ioc-angular-bookapp-joan-roldan
npm install
npm start
npm run api
```

L'aplicació estarà disponible a `http://localhost:4200/` i l'API a `http://localhost:3000/`.

També es pot iniciar amb:

```bash
ng serve
```

En una altra terminal, executar l'API:

```bash
npm run api
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

Executar l'aplicació i l'API requereix dues terminals obertes a la carpeta del projecte.

## Components creats

- `BookFilterComponent`: formulari per filtrar per text, categoria i llibres destacats.
- `BookListComponent`: mostra la llista de llibres filtrats.
- `BookCardComponent`: mostra el resum d'un llibre i permet seleccionar-lo.
- `CategoryBadgeComponent`: mostra la categoria i el distintiu “Destacat”.
- `BookFormComponent`: permet crear llibres mitjançant un formulari reactiu i mostra l'historial de creacions.

La comunicació entre components utilitza `@Input`, `@Output` i `EventEmitter`.

## Servei i API

`BookService` encapsula totes les peticions HTTP amb `HttpClient`.

- GET `http://localhost:3000/books`
- POST `http://localhost:3000/books`
- GET `http://localhost:3000/categories`

El servei adapta les respostes amb `BookAdapter`, gestiona els estats de càrrega i error i permet reintentar la consulta amb `retry()`.

## Formularis

- El formulari de cerca és reactiu i inclou validació síncrona i asíncrona, `debounceTime`, `distinctUntilChanged` i `switchMap`.
- El formulari de creació de llibres usa validacions reactives i envia les dades mitjançant POST.
- L'historial de cerques es guarda a `localStorage` i permet recuperar una cerca anterior.

## Documentació tècnica

- [Models i adaptador](./docs/models.md)
- [Serveis HTTP](./docs/serveis.md)
- [Formularis reactius i historial](./docs/formularis.md)

## Branca de lliurament

El lliurament final es publica a la branca:

```text
ra3-serveis
```
