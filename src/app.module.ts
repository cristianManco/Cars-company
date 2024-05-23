import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import db_config from './global/persistence/db_config';
import { PersistenceModule } from './global/persistence/persistence.module';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [db_config],
      isGlobal: true,
    }),
    CarsModule,
    PersistenceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
