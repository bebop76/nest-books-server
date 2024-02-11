import { Controller, Get, Param } from '@nestjs/common';
import { BookService } from './book.service';
import { NYTimesBookListResponse } from 'src/models/data';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('nytimes/lists')
  async getNYTimesBookLists(): Promise<NYTimesBookListResponse> {
    return this.bookService.getNYTimesBookLists();
  }

  @Get('nytimes/lists/:listName')
  async getBooksFromNYTimesList(
    @Param('listName') listName: string,
  ): Promise<any> {
    return this.bookService.getBooksFromList(listName);
  }
}
