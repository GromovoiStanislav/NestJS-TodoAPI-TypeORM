import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BadRequestSwagger } from "../../helpers/swagger/bad-request.swagger";
import { NotFoundSwagger } from "../../helpers/swagger/not-found.swagger";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { CreateTodoSwagger } from "./swagger/create-todo.swagger";
import { IndexTodoSwagger } from "./swagger/index-todo.swagger";
import { ShowTodoSwagger } from "./swagger/show-todo.swagger";
import { UpdateTodoSwagger } from "./swagger/update-todo.swagger";
import { TodoService } from "./todo.service";

@Controller("todos")
@ApiTags("todos")
export class TodoController {

  constructor(
    private readonly todoService: TodoService
  ) {
  }


  @Get()
  @ApiOperation({ summary: "List all tasks" })
  @ApiResponse({
    status: 200,
    description: "Task list returned successfully",
    type: IndexTodoSwagger,
    isArray: true
  })
  async index() {
    return this.todoService.findAll();
  }


  @Post()
  @ApiOperation({ summary: "Add a new task" })
  @ApiResponse({
    status: 201,
    description: "New task successfully created",
    type: CreateTodoSwagger
  })
  @ApiResponse({
    status: 400,
    description: "Invalid parameters",
    type: BadRequestSwagger
  })
  async create(@Body() body: CreateTodoDto) {
    return this.todoService.create(body);
  }


  @Get(":id")
  @ApiOperation({ summary: "View task data" })
  @ApiResponse({
    status: 200,
    description: "Data from a task returned successfully",
    type: ShowTodoSwagger
  })
  @ApiResponse({
    status: 404,
    description: "Task not found",
    type: NotFoundSwagger
  })
  async show(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.todoService.findOneOrFail(id);
  }


  @Put(":id")
  @ApiOperation({ summary: "Update task data" })
  @ApiResponse({
    status: 200,
    description: "Task updated successfully",
    type: UpdateTodoSwagger
  })
  @ApiResponse({
    status: 400,
    description: "Invalid data",
    type: BadRequestSwagger
  })
  @ApiResponse({
    status: 404,
    description: "Task not found",
    type: NotFoundSwagger
  })
  async update(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() body: UpdateTodoDto
  ) {
    return this.todoService.update(id, body);
  }


  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Remove a task" })
  @ApiResponse({
    status: 204,
    description: "Task removed successfully"
  })
  @ApiResponse({
    status: 404,
    description: "Task not found",
    type: NotFoundSwagger
  })
  async destroy(@Param("id", new ParseUUIDPipe()) id: string) {
    await this.todoService.deleteById(id);
  }

}
