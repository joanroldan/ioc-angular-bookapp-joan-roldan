import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

export interface BookFilters {
  text: string;
  category: string;
  featuredOnly: boolean;
}

@Component({
  selector: 'app-book-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './book-filter.component.html',
  styleUrl: './book-filter.component.scss'
})
export class BookFilterComponent {
  @Input() categories: string[] = [];

  @Output() filtersChanged = new EventEmitter<BookFilters>();

  text = '';
  category = '';
  featuredOnly = false;

  applyFilters(): void {
    this.filtersChanged.emit({
      text: this.text,
      category: this.category,
      featuredOnly: this.featuredOnly
    });
  }

  resetFilters(form: NgForm): void {
  form.resetForm({
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
}