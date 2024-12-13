
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      typePaths: [join(process.cwd(), 'src/**/*.gql')],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
  ]
})
export class GraphqlModule {}
