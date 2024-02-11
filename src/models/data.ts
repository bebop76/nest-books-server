// Tipo per la risposta della lista di libri di NYTimes
export interface NYTimesBookListResponse {
  list_name: string;
  display_name: string;
  list_name_encoded: string;
  oldest_published_date: Date;
  newest_published_date: Date;
  updated: string;
}

export interface GoogleBooksResponse {
  items: GoogleBook[];
  title: string;
  volumeInfo: {
    previewLink: string | null;
  };
}

export interface GoogleBook {
  title: string;
  volumeInfo: {
    previewLink: string | null;
  };
}
