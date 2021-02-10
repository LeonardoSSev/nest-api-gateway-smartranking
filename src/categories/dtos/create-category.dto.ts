import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";
import { Event } from "src/categories/interfaces/event.interface";

export class CreateCategoryDTO {

  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: Array<Event>
}

