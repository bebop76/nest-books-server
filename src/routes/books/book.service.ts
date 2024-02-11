import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  GoogleBook,
  GoogleBooksResponse,
  NYTimesBookListResponse,
} from 'src/models/data';

@Injectable()
export class BookService {
  NYTAPIKEY = 'YqT7Qk9yVC97GiuppKCXHQi52CDAARZm';
  GOOGLEAPIKEY = 'AIzaSyD2kc9Zzmc5KwW4ov-as6vCsNf3WZkCobo';

  async getNYTimesBookLists(): Promise<NYTimesBookListResponse> {
    const { data } = await axios.get(
      `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${this.NYTAPIKEY}`,
    );
    return data.results;
  }

  async getBooksFromList(listNameEncoded: string): Promise<GoogleBook[]> {
    const { data } = await axios.get(
      `https://api.nytimes.com/svc/books/v3/lists/current/${listNameEncoded}?api-key=${this.NYTAPIKEY}`,
    );
    const books = data.results.books;

    const booksOnGoogle = await this.searchinGoogleBooks(books);
    return booksOnGoogle;
  }

  async searchinGoogleBooks(
    books: GoogleBooksResponse[],
  ): Promise<GoogleBook[]> {
    const addedBooksPromises = books.map(async (book) => {
      try {
        const { data } = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(book.title)}&api-key=${this.GOOGLEAPIKEY}`,
        );
        const googleBook = data.items[0];
        const previewLink = googleBook
          ? googleBook.volumeInfo.previewLink
          : null;
        return { ...book, previewLink };
      } catch (error) {
        return { ...book, previewLink: null };
      }
    });

    const addedBooks = await Promise.all(addedBooksPromises);
    return addedBooks;
  }
}
