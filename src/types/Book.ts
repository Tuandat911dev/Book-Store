import type { Category } from '@/types/Category.ts'
import type { Author } from '@/types/Author.ts'

export type Book = {
  id: number;
  category: Category;
  author: Author;
  name: string;
  price: number;
  price_entry: number;
  avatar: string | null;
  quantity: number;
  long_description: string;
  sort_description: string;
  publish_year: number;
  size: number;
  cover_type: number;
  sold_quantity: number;
  page_count: number;
  barcode: number;
  home_order: number;
  is_featured: number;
  publisher_id: number;
  supplier_id: number;
}