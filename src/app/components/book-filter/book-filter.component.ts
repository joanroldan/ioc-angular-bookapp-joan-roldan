import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  Subscription,
  switchMap,
  timer
} from 'rxjs';
import { BookService } from '../../services/book.service';

export interface BookFilters {
  text: string;
  category: string;
  featuredOnly: boolean;
}

@Component({
  selector: 'app-book-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-filter.component.html',
  styleUrl: './book-filter.component.scss'
})
export class BookFilterComponent implements OnInit, OnDestroy {
  @Input() categories: string[] = [];

  @Output() filtersChanged = new EventEmitter<BookFilters>();

  private fb = inject(FormBuilder);
  private bookService = inject(BookService);
  private valueSubscription?: Subscription;
  private readonly historyKey = 'book-search-history';

  searchHistory: string[] = [];

  searchForm = this.fb.nonNullable.group({
    text: [
      '',
      [Validators.required, Validators.minLength(3)],
      [this.resultsValidator()]
    ],
    category: [''],
    featuredOnly: [false]
  });

  ngOnInit(): void {
    this.loadHistory();

    this.valueSubscription = this.searchForm.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged((previous, current) =>
        JSON.stringify(previous) === JSON.stringify(current)
      )
    ).subscribe(() => this.applyFilters());
  }

  ngOnDestroy(): void {
    this.valueSubscription?.unsubscribe();
  }

  applyFilters(): void {
    if (this.searchForm.invalid) {
      return;
    }

    const criteria = this.searchForm.getRawValue();
    const text = criteria.text.trim();

    this.filtersChanged.emit({
      text,
      category: criteria.category,
      featuredOnly: criteria.featuredOnly
    });

    if (text) {
      this.saveSearch(text);
    }
  }

  resetFilters(): void {
    this.searchForm.reset({
      text: '',
      category: '',
      featuredOnly: false
    });

    this.filtersChanged.emit({
      text: '',
      category: '',
      featuredOnly: false
    });
  }

  recoverSearch(term: string): void {
    this.searchForm.controls.text.setValue(term);
  }

  private resultsValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const term = control.value?.trim() ?? '';
      if (term.length < 3) {
        return of(null);
      }

      return timer(400).pipe(
        switchMap(() => {
          const criteria = this.searchForm.getRawValue();
          return this.bookService.searchBooks(
            term,
            criteria.category,
            criteria.featuredOnly
          );
        }),
        debounceTime(0),
        map(books => books.length > 0 ? null : { noResults: true }),
        catchError(() => of({ apiError: true } as ValidationErrors))
      );
    };
  }

  private loadHistory(): void {
    try {
      const stored = localStorage.getItem(this.historyKey);
      this.searchHistory = stored ? JSON.parse(stored) : [];
    } catch {
      this.searchHistory = [];
    }
  }

  private saveSearch(term: string): void {
    if (this.searchHistory[0] === term) {
      return;
    }

    this.searchHistory = [
      term,
      ...this.searchHistory.filter(item => item !== term)
    ].slice(0, 10);

    try {
      localStorage.setItem(this.historyKey, JSON.stringify(this.searchHistory));
    } catch {
      // The search remains usable even if localStorage is unavailable.
    }
  }
}