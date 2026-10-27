// Fitxer: src/app/models/item.model.ts

export interface Book {
  id: number;
  titol: string;
  autor: string;
  descripcio: string;
  categoria: 'Novel·la Històrica' | 'Ciència-ficció i Fantasia' | 'Tecnologia' | 'Thiller i Misteri';
  dataPublicacio: string; // Format YYYY-MM-DD per al DatePipe
  pagines: number;        // Camp numèric rellevant per a llibres
  destacat: boolean;      // Camp booleà per marcar llibres destacats
}