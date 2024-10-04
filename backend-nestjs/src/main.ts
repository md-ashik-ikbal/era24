import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
async function bootstrap() {
  const app1 = await NestFactory.create<NestExpressApplication>(AppModule);
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app1.useStaticAssets(join(__dirname, '..', 'uploads', 'Ads'));  // Serve Ads folder statically
  app.enableCors();
  await app.listen(3333);
}
bootstrap();
