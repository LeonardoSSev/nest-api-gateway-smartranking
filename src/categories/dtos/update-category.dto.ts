import { IsArray, IsOptional, IsString } from "class-validator";
import { Event } from "src/categories/interfaces/event.interface";

export class UpdateCategoryDTO {
  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @IsOptional()
  events: Array<Event>

}