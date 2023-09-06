import { Controller, Get, Post, Body, Param, Delete, Request, UseGuards, Put } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { RequestWithUserDto } from 'src/users/users.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto, @Request() req: RequestWithUserDto) {
    const transaction = await this.transactionsService.create(createTransactionDto, req);
    return transaction
  }

  @Get()
  async findAll(@Request() req: RequestWithUserDto) {
    const criteria = { userId: req.user?.id }
    return await this.transactionsService.findAll(criteria);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto, @Request () req: RequestWithUserDto) {
    return await this.transactionsService.update(id, updateTransactionDto, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}
