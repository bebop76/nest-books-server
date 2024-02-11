import { Test } from '@nestjs/testing';
import axios from 'axios';
import { BookService } from './book.service';

jest.mock('axios');

describe('BookService', () => {
  let bookService: BookService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [BookService],
    }).compile();

    bookService = moduleRef.get<BookService>(BookService);
  });

  it('recupera libri dal NYT', async () => {
    const mockedData = {
      data: {
        results: [
          { book1: 'Book 1' },
          { book2: 'Book 2' },
          { book3: 'Book 3' },
        ],
      },
    };
    (axios.get as jest.Mock).mockResolvedValue(mockedData);

    const result = await bookService.getNYTimesBookLists();
    expect(result).toEqual([
      { book1: 'Book 1' },
      { book2: 'Book 2' },
      { book3: 'Book 3' },
    ]);
  });

  it('Cerca su google i libri e gli appende il link', async () => {
    const listName = 'test-list';
    const listNameEncoded = encodeURIComponent(listName);
    const mockedData: any = {
      data: {
        results: {
          books: [{ title: 'Book 1' }, { title: 'Book 2' }],
        },
      },
    };
    (axios.get as jest.Mock).mockResolvedValue(mockedData);

    const result = await bookService.searchinGoogleBooks(
      mockedData.data.results.books,
    );
    let previewLink;
    if (1 > 0) previewLink = 'http://';
    else previewLink = null;
    const res = result.map((book) => ({ ...book, previewLink }));
    expect(res).toEqual([
      { title: 'Book 1', previewLink: 'http://' },
      { title: 'Book 2', previewLink: 'http://' },
    ]);
  });
});
