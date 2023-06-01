import { CreateTodoDto } from "./create-todo.dto";
import { IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";


export class UpdateTodoDto extends CreateTodoDto {
  @IsOptional()
  @ApiPropertyOptional()
  task?: string;
}
