import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConnectionConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { UserResolver } from './user/user.resolver';
import { CourseModule } from './course/course.module';

const envModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: './.env',
});
const port: number = parseInt(<string>process.env.PORT) || 3306;

@Module({
  imports: [
    envModule,
    UserModule,
    CourseModule,
    TypeOrmModule.forRoot(typeormConnectionConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
