import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { RequestParameterValidation } from 'src/shared/pipes/RequestParameterValidation.pipe';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { UpdatePlayerDTO } from './dtos/update-player.dto';

@Controller('api/v1/players')
export class PlayersController {

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
  listPlayers(): Observable<any> {
    return this.clientAdminBackend.send('list-players', '');
  }
  
  @Get(':id')
  findPlayer(@Param('id') id: string): Observable<any> {
    return this.clientAdminBackend.send('find-player', id)
  }
  
  @Post()
  @UsePipes(RequestParameterValidation)
  async createPlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
    return await this.clientAdminBackend.emit('create-player', createPlayerDTO);
  }

  @Put(':id')
  @UsePipes(RequestParameterValidation)
  async updatePlayer(@Body() updatePlayerDTO: UpdatePlayerDTO, @Param('id') id: string) {
    return await this.clientAdminBackend.emit('update-player', { id, player: updatePlayerDTO })
  }

  @Delete(':id')
  async deletePlayer(@Param('id') id: string) {
    return await this.clientAdminBackend.emit('delete-player', id);
  }
}
