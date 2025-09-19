import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('/api/tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getTasks() {
    return this.taskService.listTasks();
  }

  @Get(':id')
  viewTask(@Param('id') id: string) {
    return this.taskService.finJustOneTask(id);
  }

  @Post()
  createTask(@Body() body: any) {
    return this.taskService.createTask(body);
  }
}
