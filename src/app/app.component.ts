import { Component, OnInit, inject } from '@angular/core';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFilterComponent, BookFilters } from './components/book-filter/book-filter.component';
import { Book } from './models/item.model';
import { DatePipe } from '@angular/common';
import { BookService } from './services/book.service';
import { BookFormComponent, BookOperation } from './components/book-form/book-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BookListComponent,
    BookFilterComponent,
    BookFormComponent,
    DatePipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App implements OnInit {
  private bookService = inject(BookService);

  public appName = 'BookApp';

  public books: Book[] = [];
  public filteredBooks: Book[] = [];
  public categories: string[] = [];

  public selectedBook: Book | null = null;
  public loading = false;
  public error: string | null = null;
  public history: BookOperation[] = [];

  ngOnInit(): void {
    this.bookService.loading$.subscribe(loading => this.loading = loading);
    this.bookService.error$.subscribe(error => this.error = error);

    this.bookService.books$.subscribe(books => {
      this.books = books;
      this.filteredBooks = books;
    });

    this.bookService.getBooks().subscribe();

    this.bookService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  retryLoad(): void {
    this.bookService.retry();
  }

  onBookCreated(book: Book): void {
    this.books = [...this.books, book];
    this.filteredBooks = [...this.filteredBooks, book];
    this.selectedBook = book;
  }

  onFiltersChanged(filters: BookFilters): void {
    const searchText = filters.text.toLowerCase().trim();

    this.filteredBooks = this.books.filter(book => {
      const matchesText =
        book.titol.toLowerCase().includes(searchText) ||
        book.autor.toLowerCase().includes(searchText);

      const matchesCategory =
        filters.category === '' ||
        book.categoria === filters.category;

      const matchesFeatured =
        !filters.featuredOnly ||
        book.destacat;

      return matchesText && matchesCategory && matchesFeatured;
    });
  }

  onBookSelected(book: Book): void {
    this.selectedBook = book;
  }
}