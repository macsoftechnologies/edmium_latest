import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ToDoDto, UpdateToDoStatusDto } from './dto/to-do.dto';
import { ToDoService } from './to-do.service';

@Controller('to-do')
export class ToDoController {
  constructor(private toDoService: ToDoService) {}

  //   Get ToDos
  @Get('/:counselorId')
  async getToDos(@Param('counselorId') counselorId: string) {
    try {
      const courses = await this.toDoService.getUserToDos(counselorId);
      return courses;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  //   Add ToDo
  @Post()
  async addToDo(@Body() body: ToDoDto) {
    try {
      const response = this.toDoService.addToDo(body);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }

  //   Add ToDo
  @Put('/status/:id')
  async updateToDoStatus(
    @Body() body: UpdateToDoStatusDto,
    @Param('id') id: string,
  ) {
    try {
      const response = this.toDoService.update(id, body);
      return response;
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        errorMessage: error.message,
      };
    }
  }
}
