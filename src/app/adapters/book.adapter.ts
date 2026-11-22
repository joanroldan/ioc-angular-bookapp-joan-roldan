import { BookApi } from '../models/book-api.model';
import { Book } from '../models/item.model';

export class BookAdapter {
  static fromApi(apiBook: BookApi): Book {
    const categories: Book['categoria'][] = [
      'Novel·la Històrica',
      'Ciència-ficció i Fantasia',
      'Tecnologia',
      'Thiller i Misteri'
    ];

    const rawCategory = this.cleanText(apiBook.categoria);
    const category = categories.find(
      item => item.toLowerCase() === rawCategory.toLowerCase()
    ) ?? 'Tecnologia';

    return {
      id: this.toSafeNumber(apiBook.id, 0),
      titol: this.cleanText(apiBook.titol, 'Títol desconegut'),
      autor: this.cleanText(apiBook.autor, 'Autor desconegut'),
      descripcio: this.cleanText(apiBook.descripcio, 'Sense descripció'),
      categoria: category,
      dataPublicacio: this.normalizeDate(apiBook.dataPublicacio),
      pagines: this.toSafeNumber(apiBook.pagines, 0),
      destacat: apiBook.destacat ?? false
    };
  }

  static fromApiList(apiBooks: BookApi[]): Book[] {
    return apiBooks.map(apiBook => this.fromApi(apiBook));
  }

  private static cleanText(value: string | null | undefined, fallback = ''): string {
    return value?.trim() || fallback;
  }

  private static toSafeNumber(value: number | string | null | undefined, fallback: number): number {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === 'string' && value.trim() !== '') {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : fallback;
    }

    return fallback;
  }

  private static normalizeDate(value: string | null | undefined): string {
    const cleaned = this.cleanText(value);
    if (!cleaned) {
      return '';
    }

    const date = new Date(cleaned);
    return Number.isNaN(date.getTime())
      ? ''
      : date.toISOString().slice(0, 10);
  }
}
