import { NestFactory } from '@nestjs/core';
import { Logger } from "@nestjs/common";
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  const logger = new Logger('Bootstrap');
  logger.log(`Server running in host ${await app.getUrl()}`);
}
bootstrap();
