# Models i adaptador

## Fitxers implicats

| Tipus | Fitxer |
|---|---|
| Resposta exacta de l'API | `src/app/models/book-api.model.ts` |
| Model intern | `src/app/models/item.model.ts` |
| Adaptador normalitzador | `src/app/adapters/book.adapter.ts` |
| Servei HTTP | `src/app/services/book.service.ts` |

## Mapeig API -> model intern

| Camp API | Camp intern | Normalització |
|---|---|---|
| `id` | `id` | Conversió segura a nombre; utilitza `0` si no és vàlid |
| `titol` | `titol` | `trim()` i text per defecte si està buit |
| `autor` | `autor` | `trim()` i text per defecte si està buit |
| `descripcio` | `descripcio` | `trim()` i substitució per "Sense descripció" |
| `categoria` | `categoria` | `trim()` i coincidència normalitzada; categoria per defecte |
| `dataPublicacio` | `dataPublicacio` | Conversió i format `YYYY-MM-DD` |
| `pagines` | `pagines` | Conversió segura a nombre; utilitza `0` si no és vàlid |
| `destacat` | `destacat` | Utilitza `false` si falta |

## Evidència d'ús de dades adaptades

El servei obté les dades crues i les transforma abans de retornar-les:

```ts
return this.http.get<BookApi[]>(API_CONFIG.books).pipe(
  map(apiBooks => BookAdapter.fromApiList(apiBooks))
);
```

La vista rep únicament dades ja adaptades perquè `App` assigna el resultat del servei als arrays `books` i `filteredBooks`, i els passa al component `<app-book-list>`. Els components interns treballen amb `Book[]`.

# Exercici 4 - Cerca reactiva i historial

## Fitxers modificats

| Tipus | Fitxer |
|---|---|
| Formulari reactiu | `src/app/components/book-filter/book-filter.component.ts` |
| Plantilla i missatges | `src/app/components/book-filter/book-filter.component.html` |
| Estils | `src/app/components/book-filter/book-filter.component.scss` |
| Cerca a l'API | `src/app/services/book.service.ts` |

## Flux implementat

El camp de cerca té una validació síncrona de longitud mínima i una validació asíncrona que consulta l'API. Els canvis tenen un `debounceTime(400)`, es diferencien amb `distinctUntilChanged` i la cerca de l'API utilitza `switchMap` per cancel·lar consultes anteriors.

```ts
this.valueSubscription = this.searchForm.valueChanges.pipe(
  debounceTime(400),
  distinctUntilChanged()
).subscribe(() => this.applyFilters());
```

L'historial es desa a `localStorage` sota la clau `book-search-history`. Només s'afegeixen termes vàlids, s'evita el duplicat consecutiu i es conserven els 10 darrers termes.
