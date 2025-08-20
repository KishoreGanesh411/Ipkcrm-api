import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { environment } from '../../../environments/environment';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: environment.production
        ? true
        : join(process.cwd(), 'src/api.gql'),
      sortSchema: true,
      driver: ApolloDriver,
    }),
  ],
  providers: [],
  exports: [GraphQLModule],
})
export class GraphQlModule {}
