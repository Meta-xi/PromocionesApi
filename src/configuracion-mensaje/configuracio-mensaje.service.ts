import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfiguracionMensaje } from './configracion-mensaje.entity';
import { Repository } from 'typeorm';
import { User } from 'src/User/user.entity';
import { CreateConfigurationMessage } from './Message_configuration.dto';
import { MessageBack } from './MessageBack';

@Injectable()
export class ConfiguracioMensajeService {
    constructor(
        @InjectRepository(ConfiguracionMensaje)
        private configurationRepository: Repository<ConfiguracionMensaje>,
        @InjectRepository(User)
        private user: Repository<User>
    ){}
    async createConfigurationMessage(configurationMessage: CreateConfigurationMessage): Promise<ConfiguracionMensaje>{
        const {chat_id , ids_destino , mensaje , intervalo } = configurationMessage;
        const user =  await this.user.findOne({ where: { idUserTelegram: chat_id}})
        if(!user){
            throw new NotFoundException('Usuario no encontrado');
        }
        const configuration = this.configurationRepository.create({
            user,
            ids_destino,
            mensaje,
            intervalo,
        })
        console.log(new Date());
        console.log(configuration.createdAt);
        return await this.configurationRepository.save(configuration);
    }
    async findAll(): Promise<ConfiguracionMensaje[]>{
        return await this.configurationRepository.find({relations: ['user']});
    }
    async OrderByTime(): Promise<MessageBack[]> {
        var messages = await this.findAll();
        var messagesToGetBack: MessageBack[] = [];
        var timeNow: Date = new Date();
        var timeNowUtc = timeNow.toISOString(); 
        for(const element of messages){
            var createdAtUtc = new Date(element.createdAt.toISOString());
            var createAtTime = new Date(createdAtUtc).getTime();
            var nowTime = new Date(timeNowUtc).getTime();
            if (createAtTime > nowTime) {
                return;
            }
            const diffMs = nowTime - createAtTime;
            const diffMinutes = diffMs / (1000 * 60);
    
            if (diffMinutes >= element.intervalo) {
                
                const messageBack: MessageBack = {
                    ids_destino: element.ids_destino,
                    mensaje: element.mensaje,
                    idUserTelegram: element.user.idUserTelegram,
                    sessionToken: element.user.sesionToken
                };
                messagesToGetBack.push(messageBack);
                element.createdAt = new Date();
                await this.configurationRepository.save(element);
            }
        }
        return messagesToGetBack;
    }
    
}
