import { HttpException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async listTasks() {
    const allTasks = await this.prisma.task.findMany();
    return allTasks;
  }

  async finJustOneTask(id: number) {
    const task = await this.prisma.task.findFirst({
      where: {
        id: id,
      },
    });

    if (task?.name) return task;
    throw new HttpException('Nenhuma tarefa encontrada.', 404);
  }

  async createTask(body: CreateTaskDto) {
    if (!body.description || !body.description) {
      throw new HttpException('Descrição e nome são necessários', 400);
    }

    const newTask = await this.prisma.task.create({
      data: {
        name: body.name,
        description: body.description,
        completed: false,
      },
    });

    return newTask;
  }

  async update(id: number, body: UpdateTaskDto) {
    const findTask = await this.prisma.task.findFirst({
      where: {
        id: id,
      },
    });

    if (!findTask) {
      throw new HttpException('Tarefa selecionada não existe', 404);
    }

    const taskUpdated = await this.prisma.task.update({
      where: {
        id: findTask.id,
      },
      data: body,
    });

    return {
      message: 'Tarefa alterada com sucesso',
      data: taskUpdated,
    };
  }
}
