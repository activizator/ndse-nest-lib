import { Test } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { getModelToken } from '@nestjs/mongoose';
import { BookModule } from './book.module';

describe('BookController Test', () => {
  let bookController: BookController;
  let bookService: BookService;

  beforeEach(async () => {
    const mockRepository = {
      find() {
        return [
          {
            fileCover: 'http://placehold.it/200x300',
            favorite: 'yes',
            authors: 'Супергерои',
            description: 'Книга про супергероев 3',
            _id: '60327f1d07cc172f7022bcc9',
            fileName: 'superbook3.txt',
            title: 'Просто книга 3',
          },
          {
            fileCover: 'http://placehold.it/200x300',
            favorite: 'yes',
            authors: 'Супергерои',
            description: 'Книга про супергероев 2',
            _id: '60327f2507cc172f7022bcca',
            fileName: 'superbook2.txt',
            title: 'Суперкнига 2',
          },
        ];
      },
    };

    const module = await Test.createTestingModule({
      imports: [BookModule],
    })
      .overrideProvider(getModelToken('Book'))
      .useValue(mockRepository)
      .compile();

    bookService = module.get<BookService>(BookService);
    bookController = module.get<BookController>(BookController);
  });

  describe('findAll method test', () => {
    it('should return books array', async () => {
      const result = [
        {
          fileCover: 'http://placehold.it/200x300',
          favorite: 'yes',
          authors: 'Супергерои',
          description: 'Книга про супергероев 3',
          _id: '60327f1d07cc172f7022bcc9',
          fileName: 'superbook3.txt',
          title: 'Просто книга 3',
        },
        {
          fileCover: 'http://placehold.it/200x300',
          favorite: 'yes',
          authors: 'Супергерои',
          description: 'Книга про супергероев 2',
          _id: '60327f2507cc172f7022bcca',
          fileName: 'superbook2.txt',
          title: 'Суперкнига 2',
        },
      ];
      jest.spyOn(bookService, 'findAll').mockImplementation(async () => result);
      expect(await bookController.getBooks()).toEqual(result);
    });
  });
});
