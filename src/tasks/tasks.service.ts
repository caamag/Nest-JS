import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  listTasks() {
    return [
      {
        id: 1,
        task: 'Alguma tarefa chata aí',
      },
    ];
  }

  finJustOneTask(id: string) {
    return `Buscar tarefa com o ID: ${id}`;
  }

  createTask(body: any) {
    return body;
  }
}
