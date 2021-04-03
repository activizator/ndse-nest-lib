import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { BookService } from './book.service';
import { INestApplication } from '@nestjs/common';
import { BookController } from './book.controller';

describe('Books', () => {
  let app: INestApplication;
  const bookService = {
    findAll: () => {
      return ['test'];
    },
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [BookController],
      providers: [BookService],
    })
      .overrideProvider(BookService)
      .useValue(bookService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET api/book`, () => {
    return request(app.getHttpServer())
      .get('/api/book')
      .expect(200)
      .expect(['test']);
  });
  afterAll(async () => {
    await app.close();
  });
});
