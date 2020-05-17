import { Injectable, Inject } from '@nestjs/common';
import { Employee } from './entity/employee.entity';
import { EmployeeDto } from './dto/employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @Inject('EmployeesRepository')
    private readonly employeesRepository: typeof Employee,
  ) {}

  async findAll(): Promise<Employee[]> {
    return await this.employeesRepository.findAll<Employee>();
  }

  async findById(ID: number): Promise<Employee> {
    return await this.employeesRepository.findByPk(ID);
  }
  async create(createEmployeeDto: EmployeeDto): Promise<Employee> {
    return await this.employeesRepository.create<Employee>(createEmployeeDto);
  }

  async update(id: number, newValue: EmployeeDto): Promise<Employee | null> {
    let todo = await this.employeesRepository.findByPk<Employee>(id);

    if (!todo.id) {
      // tslint:disable-next-line:no-console
      console.error("user doesn't exist");
    }

    todo = this._assign(todo, newValue);

    return await todo.save({ returning: true });
  }

  public async delete(ID: number): Promise<number> {
    return await this.employeesRepository.destroy({
      where: { ID },
    });
  }

  private _assign(todo: EmployeeDto, newValue: EmployeeDto): Employee {
    // tslint:disable-next-line:no-string-literal
    for (const key of Object.keys(todo['dataValues'])) {
      if (todo[key] !== newValue[key]) {
        //
        todo[key] = newValue[key];
      }
    }
    return todo as Employee;
  }
}
