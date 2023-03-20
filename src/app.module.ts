import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './modules/chat/chat.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {connectionDB} from "./db/typeorm.config";

@Module({
  imports: [
      TypeOrmModule.forRoot({
        ...connectionDB,
        autoLoadEntities: true
      }),
      ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
