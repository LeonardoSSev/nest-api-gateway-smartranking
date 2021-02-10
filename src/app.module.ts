import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PlayersModule } from './players/players.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [PlayersModule, CategoriesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
