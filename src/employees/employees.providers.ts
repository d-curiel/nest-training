import { Employee } from './entity/employee.entity';

export const employeesProviders = [
    {
        provide: 'EmployeesRepository',
        useValue: Employee,
    },
];