import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ToDoSchema } from './dto/to-do.schema';
import { ToDoController } from './to-do.controller';
import { ToDoService } from './to-do.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'ToDo', schema: ToDoSchema }])],
  controllers: [ToDoController],
  providers: [ToDoService],
})
export class ToDoModule {}
