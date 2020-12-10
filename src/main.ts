import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Fkake API')
    .setDescription('The API as provided from this implementation flake')
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Localhost test')
    .setExternalDoc('Swagger JSON file', 'http://localhost:3000/api-json')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
