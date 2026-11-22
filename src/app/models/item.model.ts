export interface Book {
  id: number;
  titol: string;
  autor: string;
  descripcio: string;
  categoria: 'Novel·la Històrica' | 'Ciència-ficció i Fantasia' | 'Tecnologia' | 'Thiller i Misteri';
  dataPublicacio: string; // Format YYYY-MM-DD per al DatePipe
  pagines: number;
  destacat: boolean;
}