import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { Book } from '../../models/item.model';
import { BookCardComponent } from '../book-card/book-card.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
  @Input() books: Book[] = [];

  @Output() bookSelected = new EventEmitter<Book>();

  selectBook(book: Book): void {
    this.bookSelected.emit(book);
  }
}