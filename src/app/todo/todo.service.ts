import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { TodoEntity } from "./entity/todo.entity";

@Injectable()
export class TodoService {

  constructor(
    @InjectRepository(TodoEntity) private readonly todoRepository: Repository<TodoEntity>
  ) {
  }


  async findAll() {
    return this.todoRepository.find({ order: { createdAt: "DESC" } });
  }


  async findOneOrFail(id: string) {
    const task = await this.todoRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException("Task not found");
    }
    return task;
  }


  async create(data: CreateTodoDto) {
    return this.todoRepository.save(this.todoRepository.create(data));
  }


  async update(id: string, data: UpdateTodoDto) {
    const todo = await this.findOneOrFail(id);
    this.todoRepository.merge(todo, data);
    return this.todoRepository.save(todo);
  }


  async deleteById(id: string) {
    await this.findOneOrFail(id);
    await this.todoRepository.softDelete(id);
  }

}
