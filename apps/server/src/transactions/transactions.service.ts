import { pick } from 'lodash';
import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { RequestWithUserDto } from 'src/users/users.dto';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private prismaService: PrismaService) { }
  async create(createTransactionDto: CreateTransactionDto, req: RequestWithUserDto) {
    const { user } = req;
    const { name, amount, type, categoryId, date, walletId } = createTransactionDto;
    const transactionValues = {
      name,
      amount,
      type,
      date: new Date(date),
      userId: user?.id,
      categoryId: categoryId,
      organizationId: user?.organizationId,
      walletId,
    }
    const transaction = await this.prismaService.transaction.create({
      data: transactionValues
    });
    return transaction;
  }

  async findAll(criteria: { userId: string }) {
    return this.prismaService.transaction.findMany({
      where: criteria
    });
  }

  async findOne(id: string) {
    return this.prismaService.transaction.findUnique({ where: { id } })
  }

  async findOneByCriteria<T>(criteria: T) {
    return this.prismaService.transaction.findFirst({ where: criteria })
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto, req: RequestWithUserDto) {
    let transaction = await this.findOne(id)
    if (!transaction) {
      throw new Error('Transaction not found')
    }
    const transactionValues = pick(updateTransactionDto, ['name', 'amount', 'type', 'categoryId', 'date', 'description', 'walletId'])

    transaction = await this.prismaService.transaction.update({
      where: { id },
      data: {
        ...transactionValues,
        date: new Date(transactionValues.date)
      }
    });

    return transaction;
  }

  remove(id: string) {
    return `This action removes a #${id} transaction`;
  }
}
