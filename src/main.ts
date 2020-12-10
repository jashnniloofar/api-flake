import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { APP_DESCRIPTION, APP_TITLE, BASE_PATH, PORT, SERVER_URL, VERSION } from './config/server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(BASE_PATH);

  const options = new DocumentBuilder()
    .setTitle(APP_TITLE)
    .setDescription(APP_DESCRIPTION)
    .setVersion(VERSION)
    .addServer(`${SERVER_URL}/${BASE_PATH}`, 'Localhost test')
    .setExternalDoc('Swagger JSON file', `${SERVER_URL}/api-json`)
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    ignoreGlobalPrefix: true,
  });

  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
