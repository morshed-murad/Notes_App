export interface Note {
  id: string;
  title: string;
  content: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt?: string;
}
