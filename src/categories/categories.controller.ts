import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateCategoryDTO } from 'src/categories/dtos/create-category.dto';
import { RequestParameterValidation } from 'src/shared/pipes/RequestParameterValidation.pipe';
import { UpdateCategoryDTO } from './dtos/update-category.dto';

@Controller('api/v1/categories')
export class CategoriesController {

  private clientAdminBackend: ClientProxy;

  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: process.env.RABBITMQ_QUEUE
      }
    });
  }
  @Get()
  listCategories(): Observable<any> {
    return this.clientAdminBackend.send('list-categories', '');
  }
  
  @Get(':id')
  findCategory(@Param('id') id: string): Observable<any> {
    return this.clientAdminBackend.send('find-category', id);
  }
  
  @Post()
  @UsePipes(RequestParameterValidation)
  async createCategory(@Body() createCategoryDTO: CreateCategoryDTO) {
    return await this.clientAdminBackend.emit('create-category', createCategoryDTO);
  }

  @Put(':id')
  @UsePipes(RequestParameterValidation)
  async updateCategory(@Body() updateCategoryDTO: UpdateCategoryDTO, @Param('id') id: string) {
    return await this.clientAdminBackend.emit('update-category', { id, category: updateCategoryDTO});
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return await this.clientAdminBackend.emit('delete-category', id);
  }


}
