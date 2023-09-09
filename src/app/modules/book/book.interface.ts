export type IBookFilters = {
  searchTerm?: string;
  title?: string;
  author?: string;
  genre?: string;
  publicationDate?: string;
  category?: string;
  categoryId?: string;
};

export type IBookOptions = {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  maxPrice?: string;
  minPrice?: string;
};
