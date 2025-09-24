import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('/api/tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getTasks() {
    return this.taskService.listTasks();
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
    return `Deletando task ${id}`;
  }
}
