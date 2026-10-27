import { Component } from '@angular/core';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFilterComponent, BookFilters } from './components/book-filter/book-filter.component';
import { Book } from './models/item.model';
import { BOOKS_MOCK, CATEGORIES_LLIBRES } from './data/items.mock';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BookListComponent,
    BookFilterComponent,
    DatePipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App {
  public appName = 'BookApp';

  public books: Book[] = BOOKS_MOCK;
  public filteredBooks: Book[] = BOOKS_MOCK;
  public categories: string[] = CATEGORIES_LLIBRES;

  public selectedBook: Book | null = null;

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