import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../../models/item.model';
import { BookCreateApi } from '../../models/book-api.model';
import { BookService } from '../../services/book.service';

export interface BookOperation {
  action: 'Creació';
  date: string;
  titol: string;
}

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent {
  @Input() categories: string[] = [];
  @Output() bookCreated = new EventEmitter<Book>();

  private fb = inject(FormBuilder);
  private bookService = inject(BookService);

  history: BookOperation[] = [];

  bookForm = this.fb.nonNullable.group({
    titol: ['', [Validators.required, Validators.minLength(3)]],
    autor: ['', [Validators.required]],
    descripcio: ['', [Validators.required, Validators.minLength(10)]],
    categoria: ['', Validators.required],
    dataPublicacio: ['', Validators.required],
    pagines: [0, [Validators.required, Validators.min(1)]],
    destacat: [false]
  });

  submit(): void {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const values = this.bookForm.getRawValue();
    const payload: BookCreateApi = {
      ...values,
      titol: values.titol.trim(),
      autor: values.autor.trim(),
      descripcio: values.descripcio.trim()
    };

    this.bookService.createBook(payload).subscribe(createdBook => {
      if (!createdBook) {
        return;
      }

      this.history.unshift({
        action: 'Creació',
        date: new Date().toISOString(),
        titol: createdBook.titol
      });
      this.bookCreated.emit(createdBook);
      this.bookForm.reset({
        titol: '',
        autor: '',
        descripcio: '',
        categoria: '',
        dataPublicacio: '',
        pagines: 0,
        destacat: false
      });
    });
  }
}
