import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix("api");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );

  const config = new DocumentBuilder()
    .setTitle("TODO API")
    .setVersion("0.0.1")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/", app, document);


  await app.listen(process.env.PORT);
}

bootstrap();
