import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestWithUserDto } from 'src/users/users.dto';

@Injectable()
export class TransactionsService {
  constructor(private prismaService: PrismaService) { }
  async create(createTransactionDto: CreateTransactionDto, req: RequestWithUserDto) {
    const { user } = req;
    const { name, amount, type, categoryId, date } = createTransactionDto;
    const transactionValues = {
      name,
      amount,
      type,
      date: new Date(date),
      userId: user?.id,
      categoryId: categoryId,
      organizationId: user?.organizationId,

    }
    const transaction = await this.prismaService.transaction.create({
      data: transactionValues,
    });
    return transaction;
  }

  async findAll(criteria: { userId: string }) {
    return this.prismaService.transaction.findMany({
      where: criteria
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} transaction`;
  }

  update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: string) {
    return `This action removes a #${id} transaction`;
  }
}
