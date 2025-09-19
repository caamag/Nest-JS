import { Module } from '@nestjs/common';

//controllers
import { AppController } from './app.controller';

//services
import { AppService } from './app.service';

//modules
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
