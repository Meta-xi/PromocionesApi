import { DataSource } from "typeorm";

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'viaduct.proxy.rlwy.net', // Host de Railway
    port: 29547, // Puerto de Railway
    username: 'postgres', // Usuario
    password: 'zKWetoHwGqEvQdeNocBKXqBIrFpkwIKI', // Contraseña
    database: 'railway', // Nombre de la base de datos
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false, // No activar sincronización automática en producción
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}'], // Directorio de migraciones
});
