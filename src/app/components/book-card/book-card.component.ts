import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { DatePipe } from '@angular/common';

import { Book } from '../../models/item.model';
import { CategoryBadgeComponent } from '../category-badge/category-badge.component';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CategoryBadgeComponent, DatePipe],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {
  @Input({ required: true }) book!: Book;

  @Output() cardSelected = new EventEmitter<Book>();

  selectCard(): void {
    this.cardSelected.emit(this.book);
  }
}