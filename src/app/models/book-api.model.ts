export interface BookApi {
  id: number | string;
  titol?: string | null;
  autor?: string | null;
  descripcio?: string | null;
  categoria?: string | null;
  dataPublicacio?: string | null;
  pagines?: number | string | null;
  destacat?: boolean | null;
}

export type BookCreateApi = Omit<BookApi, 'id'>;
