import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './app/user/user-api.service';
import { IpkLeaddModule } from './app/lead/ipk-leadd.module';
import { PrismaAppModule } from 'prisma';
import './app/app.enum';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, // or a path
      sortSchema: true,
      playground: true,
    }),
    IpkLeaddModule,
    PrismaAppModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
