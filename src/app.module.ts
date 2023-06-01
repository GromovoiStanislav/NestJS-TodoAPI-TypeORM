import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoModule } from "./app/todo/todo.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // @ts-ignore
      useFactory: (configService: ConfigService) => ({
        type: configService.get("DB_TYPE", "mysql"),
        host: configService.get("DB_HOST", "localhost"),
        port: Number(configService.get("DB_PORT", 3306)),
        username: configService.get("DB_USERNAME", "root"),
        password: configService.get("DB_PASSWORD", "123"),
        database: configService.get("DB_DATABASE", "todo"),
        entities: [__dirname + "/**/*.entity{.js,.ts}"],
        synchronize: true
      })
    }),
    TodoModule
  ]
})
export class AppModule {
}
