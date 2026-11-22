# Servei HTTP

## Fitxer i responsabilitat

El servei HTTP és [book.service.ts](../src/app/services/book.service.ts).

`BookService` encapsula `HttpClient` i evita que els components construeixin URLs o facin peticions directament.

## Mètodes principals

| Operació | Mètode | Endpoint | Transformació |
|---|---|---|---|
| Obtenir llibres | `getBooks()` | `GET http://localhost:3000/books` | `BookAdapter.fromApiList()` |
| Obtenir categories | `getCategories()` | `GET http://localhost:3000/categories` | Extracció i neteja dels noms |
| Cercar llibres | `searchBooks()` | `GET http://localhost:3000/books` | `BookAdapter.fromApiList()` |
| Crear llibre | `createBook()` | `POST http://localhost:3000/books` | `BookAdapter.fromApi()` |

## Estats

- `loading$`: `BehaviorSubject<boolean>` que indica càrrega.
- `error$`: `BehaviorSubject<string | null>` que conté el missatge d'error.
- `catchError()` mostra un estat d'error i evita propagar excepcions.
- `finalize()` desactiva l'estat de càrrega.

## Reintent i switchMap

El flux `books$` escolta `reloadTrigger` i utilitza `switchMap` per iniciar la consulta GET i cancel·lar una petició anterior si se'n inicia una de nova.

Quan l'usuari prem `Reintentar`, `retryLoad()` crida `retry()`, que emet un nou valor a `reloadTrigger` i repeteix l'última consulta GET.

## Evidència a la interfície

La interfície mostra l'estat de càrrega amb `role="status"` i els errors amb `role="alert"` a [app.component.html](../src/app/app.component.html).
