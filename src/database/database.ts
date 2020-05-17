import { Sequelize } from 'sequelize-typescript';
import { Employee } from 'src/employees/entity/employee.entity';

export const databaseProviders = [
    {
        provide: 'SequelizeToken',
        useFactory: async () => {
            const sequelize = new Sequelize({
              dialect: 'mysql',
              host: 'localhost',
              port: 3307,
              username: 'dba',
              password: 'dba1234',
              database: 'nesttrainingdb',
            });
            sequelize.addModels([Employee]);
            await sequelize.sync();
            return sequelize;
        },
    },
];