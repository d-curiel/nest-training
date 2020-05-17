import {
  Controller,
  Get,
  HttpStatus,
  Response,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';
import { EmployeeDto } from './dto/employee.dto';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  public async getEmployees(@Response() res) {
    const employees = await this.employeesService.findAll();
    return res.status(HttpStatus.OK).json(employees);
  }

  @Get('/:id')
  public async getEmployee(@Response() res, @Param() param) {
    const employees = await this.employeesService.findById(param.id);
    return res.status(HttpStatus.OK).json(employees);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  public async createEmployee(
    @Response() res,
    @Body() employeeDTO: EmployeeDto,
  ) {
    const todo = await this.employeesService.create(employeeDTO);
    return res.status(HttpStatus.OK).json(todo);
  }

  @Patch('/:id')
  public async updateEmployee(@Param() param, @Response() res, @Body() body) {
    const todo = await this.employeesService.update(param.id, body);
    return res.status(HttpStatus.OK).json(todo);
  }

  @Delete('/:id')
  public async deleteEmployee(@Param() param, @Response() res) {
    const todo = await this.employeesService.delete(param.id);
    return res.status(HttpStatus.OK).json(todo);
  }
}
