import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ConfiguracioMensajeService } from './configuracio-mensaje.service';
import { CreateConfigurationMessage } from './Message_configuration.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ConfiguracionMensaje } from './configracion-mensaje.entity';
import { MessageBack } from './MessageBack';

@ApiTags('configuracio-mensaje')
@Controller('configuracio-mensaje')
export class ConfiguracioMensajeController {
    constructor(private configurationMessageService : ConfiguracioMensajeService){

  }
    @Post()
    async createConfigurationMessage(@Body() messageConfiguration: CreateConfigurationMessage , @Res() res : Response){
        const configurationMessage = await this.configurationMessageService.createConfigurationMessage(messageConfiguration);
        if(!configurationMessage){
            return res.status(HttpStatus.BAD_REQUEST).json({
                message : 'No se pudo crear la configuracion del mensaje'
            });
        }
        return res.status(HttpStatus.OK).json({
            message: "Configuracion creada correctamente"
        })
    }
    @Get()
    async GetAllConfiguration():Promise<MessageBack[]>{
        return await this.configurationMessageService.OrderByTime();
    }
}
