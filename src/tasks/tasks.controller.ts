import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptor';

@UseInterceptors(LoggerInterceptor)
@Controller('/api/tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() pagination: PaginationDto) {
    return this.taskService.listTasks(pagination);
  }

  @Get(':id')
  viewTask(@Param('id') id: string) {
    return this.taskService.finJustOneTask(Number(id));
  }

  @Post()
  createTask(@Body() body: any) {
    return this.taskService.createTask(body);
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    return this.taskService.update(Number(id), body);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.delete(Number(id));
  }
}
