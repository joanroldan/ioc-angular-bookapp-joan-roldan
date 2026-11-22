import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, finalize, map, Observable, of, switchMap } from 'rxjs';
import { API_CONFIG } from '../data/api.config';
import { BookAdapter } from '../adapters/book.adapter';
import { BookApi, BookCreateApi } from '../models/book-api.model';
import { Book } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private http = inject(HttpClient);
  private reloadTrigger = new BehaviorSubject<void>(undefined);

  readonly loading$ = new BehaviorSubject<boolean>(false);
  readonly error$ = new BehaviorSubject<string | null>(null);

  readonly books$ = this.reloadTrigger.pipe(
    switchMap(() => {
      this.loading$.next(true);
      this.error$.next(null);

      return this.http.get<BookApi[]>(API_CONFIG.books).pipe(
        map(apiBooks => BookAdapter.fromApiList(apiBooks)),
        catchError(() => {
          this.error$.next('No s’ha pogut carregar el catàleg.');
          return of([]);
        }),
        finalize(() => this.loading$.next(false))
      );
    })
  );

  getBooks(): Observable<Book[]> {
    this.reloadTrigger.next();
    return this.books$;
  }

  retry(): void {
    this.reloadTrigger.next();
  }

  createBook(book: BookCreateApi): Observable<Book | null> {
    this.loading$.next(true);
    this.error$.next(null);

    return this.http.post<BookApi>(API_CONFIG.books, book).pipe(
      map(apiBook => BookAdapter.fromApi(apiBook)),
      catchError(() => {
        this.error$.next('No s’ha pogut crear el llibre.');
        return of(null);
      }),
      finalize(() => this.loading$.next(false))
    );
  }

  getCategories(): Observable<string[]> {
    return this.http.get<{ id: number; nom: string }[]>(API_CONFIG.categories).pipe(
      map(categories => categories.map(category => category.nom.trim()).filter(Boolean))
    );
  }

  searchBooks(text: string, category = '', featuredOnly = false): Observable<Book[]> {
    let params = new HttpParams();

    if (text.trim()) {
      params = params.set('q', text.trim());
    }
    if (category) {
      params = params.set('categoria', category);
    }
    if (featuredOnly) {
      params = params.set('destacat', 'true');
    }

    return this.http.get<BookApi[]>(API_CONFIG.books, { params }).pipe(
      switchMap(apiBooks => of(BookAdapter.fromApiList(apiBooks))),
      catchError(() => of([]))
    );
  }
}
