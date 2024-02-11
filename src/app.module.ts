import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookService } from './routes/books/book.service';
import { BookModule } from './routes/books/book.module';
import { BookController } from './routes/books/book.controller';

@Module({
  imports: [BookModule],
  controllers: [AppController, BookController],
  providers: [AppService, BookService],
})
export class AppModule {}
