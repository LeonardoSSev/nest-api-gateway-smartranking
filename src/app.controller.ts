import { Body, Controller, Logger, Post, UsePipes } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CreateCategoryDTO } from './dtos/categories/create-category.dto';
import { RequestParameterValidation } from './pipes/RequestParameterValidation.pipe';

@Controller('api/v1')
export class AppController {

  private logger = new Logger(AppController.name);

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

  @Post('categories')
  @UsePipes(RequestParameterValidation)
  async createCategory(@Body() createCategoryDTO: CreateCategoryDTO) {
    return await this.clientAdminBackend.emit('create-category', createCategoryDTO);
  }

}
