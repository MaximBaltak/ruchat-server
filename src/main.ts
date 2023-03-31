import {NestFactory} from '@nestjs/core';
import {config} from 'dotenv';
import {AppModule} from './app.module';

async function bootstrap() {
    config()
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin:'*',
        methods:['GET','POST','DELETE','PATCH','PUT','OPTIONS'],
        allowedHeaders:[ 'Content-Type','Authorization']
    })
    await app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
        console.log(`server run on port ${process.env.SERVER_PORT}`)
    });
}

bootstrap();
