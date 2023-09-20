import { DataSource } from 'typeorm';
import entities from '../entities';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '143143143',
        database: 'isbudget',
        entities,
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];