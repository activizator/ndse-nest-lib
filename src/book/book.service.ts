import { Injectable } from '@nestjs/common';
import { FirebaseDatabaseService } from '@aginix/nestjs-firebase-admin';

@Injectable()
export class BookService {
  constructor(private db: FirebaseDatabaseService) {}

  async findAll(): Promise<any> {
    const snapshot = await this.db.ref('MyLib').get();
    return snapshot;
  }

  async create(book: any): Promise<any> {
    const res = await this.db.ref('MyLib').push(book);
    const snapshot = await this.db.ref(res).get();
    return snapshot;
  }

  async read(id: string): Promise<any> {
    const snapshot = await this.db.ref('MyLib').child(id).get();
    return snapshot;
  }

  async update(id: string, book: any): Promise<any> {
    const snapshot = await this.db.ref('MyLib').child(id).update(book);
    return snapshot;
  }

  async delete(id: string): Promise<any> {
    const snapshot = await this.db.ref('MyLib').child(id).remove();
    return snapshot;
  }
}
