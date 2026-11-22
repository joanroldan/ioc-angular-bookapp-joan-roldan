# Formularis reactius

## Formulari de cerca

El formulari reactiu és [book-filter.component.ts](../src/app/components/book-filter/book-filter.component.ts) i la seva plantilla és [book-filter.component.html](../src/app/components/book-filter/book-filter.component.html).

### Camps

- `text`: cerca per títol o autor.
- `category`: categoria seleccionada.
- `featuredOnly`: només llibres destacats.

### Validacions

- `text` usa `Validators.required` i `Validators.minLength(3)`.
- `resultsValidator()` és un validador asíncron que consulta l'API i comprova si existeixen resultats.
- Els camps invalids mostren missatges visibles només quan han estat tocats.

### Flux de cerca

Els canvis del formulari passen per `debounceTime(400)` i `distinctUntilChanged()` abans d'emetre els criteris al component principal.

`searchBooks()` utilitza `switchMap` al servei HTTP per cancel·lar consultes superades i adaptar les respostes.

## Neteja i historial

- El botó de restabliment buida tots els camps i mostra el catàleg complet.
- Els darrers termes vàlids es guarden a `localStorage` amb la clau `book-search-history`.
- Els duplicats consecutius no s'afegeixen.
- L'historial conserva com a màxim els 10 darrers termes.
- `loadHistory()` i `saveSearch()` gestionen excepcions de `localStorage` mitjançant `try/catch`.
- Els botons de l'historial recuperen el terme al formulari.

## Formulari de creació

El formulari reactiu de creació és [book-form.component.ts](../src/app/components/book-form/book-form.component.ts).

Valida títol, autor, descripció, categoria, data i nombre de pàgines abans d'enviar un POST.
