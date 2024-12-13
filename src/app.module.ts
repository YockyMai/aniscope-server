import { Module } from '@nestjs/common'

import { ConfigModule } from './config/config.module'
import { DatabaseModule } from './database/database.module'
import { GraphqlModule } from './graphql/graphql.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [DatabaseModule.forRoot(), GraphqlModule, UserModule, ConfigModule]
})
export class AppModule {}
