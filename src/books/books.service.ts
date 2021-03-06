import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  getHi(): string {
    return 'Hi!';
  }
}
