import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Task } from './entities/entities.task';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      name: 'Aprender Nest JS',
      description: 'Aprendendo backend',
      completed: false,
    },
    {
      id: 2,
      name: 'Aprender Nest JS',
      description: 'Aprendendo backend',
      completed: false,
    },
  ];

  listTasks() {
    return this.tasks;
  }

  finJustOneTask(id: string) {
    const task = this.tasks.find((task) => task.id === Number(id));

    if (task) return task;
    throw new HttpException('Nenhuma tarefa encontrada.', 404);
  }

  createTask(body: CreateTaskDto) {
    const newId = this.tasks.length + 1;
    const newTask = {
      id: newId,
      completed: false,
      ...body,
    };

    this.tasks.push(newTask);
    return newTask;
  }
}
