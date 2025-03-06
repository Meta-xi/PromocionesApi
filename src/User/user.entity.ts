import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ConfiguracionMensaje } from 'src/configuracion-mensaje/configracion-mensaje.entity';

@Entity()
export class User {
    @ApiProperty({
        description: 'ID autogenerado del usuario',
        example: 1
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'ID del usuario en Telegram',
        example: 123456789
    })
    @Column({type: 'bigint', unique: true})
    idUserTelegram: number;

    @ApiProperty({
        description: 'Token de sesión del usuario',
        example: 'abc123xyz789'
    })
    @Column({type: 'varchar', unique: false})
    sesionToken: string;
    @OneToMany(() => ConfiguracionMensaje , configuracion => configuracion.user)
    configuracion: ConfiguracionMensaje[]
}