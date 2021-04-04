import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { SignupModule } from './signup/signup.module';
import { AuthModule } from './auth/auth.module';
import { BookCommentModule } from './book.comment/book.comment.module';
import { WsBookCommentModule } from './ws.book.comment/ws.book.comment.module';

const BD = 'MyLibDB';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MDBUSER}:${process.env.MDBPASS}@cluster0.0isj7.azure.mongodb.net/${BD}?retryWrites=true&w=majority`,
      { useFindAndModify: false },
    ),
    BookModule,
    SignupModule,
    AuthModule,
    BookCommentModule,
    WsBookCommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
