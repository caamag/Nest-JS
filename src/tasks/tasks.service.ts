import { HttpException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async listTasks(paginationDto: PaginationDto) {
    const { limit = 100, offset = 0 } = paginationDto;

    const allTasks = await this.prisma.task.findMany({
      take: limit,
      skip: offset,
    });
    return {
      message: 'Tarefas encontradas',
      data: allTasks,
    };
  }

  async finJustOneTask(id: number) {
    const task = await this.prisma.task.findFirst({
      where: {
        id: id,
      },
    });

    if (!task) throw new HttpException('Nenhuma tarefa encontrada.', 404);

    return {
      message: 'Tarefa encontrada',
      data: task,
    };
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

    return {
      message: 'Tarefa criada com sucesso.',
      data: newTask,
    };
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

  async delete(id: number) {
    const taskExist = await this.prisma.task.findFirst({
      where: {
        id: id,
      },
    });

    if (!taskExist)
      throw new HttpException('Task selecionada não existe.', 404);

    await this.prisma.task.delete({
      where: {
        id: id,
      },
    });

    return {
      message: 'Tarefa deletada com sucesso',
    };
  }
}
