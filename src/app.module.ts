import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ChatModule} from './modules/chat/chat.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {connectionDB} from "./db/typeorm.config";
import {FileModule} from './modules/file/file.module';
import {AuthModule} from "./modules/auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...connectionDB,
            autoLoadEntities: true
        }),
        ChatModule,
        FileModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
