import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { RequestWithUserDto } from 'src/users/users.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { pick } from 'lodash';

@Injectable()
export class WalletsService {

  constructor(private prismaService: PrismaService) { }

  async create(createWalletDto: CreateWalletDto, req: RequestWithUserDto) {
    const walletValues = pick(createWalletDto, ['name', 'description', 'amount']);
    const { organizationId, id: userId } = req.user;
    const wallet = await this.prismaService.wallet.create({
      data: {
        ...walletValues,
        organization: { connect: { id: organizationId } },
        user_account: { connect: { id: userId } }
      },
    });

    return wallet;
  }

  findAll(req: RequestWithUserDto) {
    return this.prismaService.wallet.findMany({
      where: {
        userId: req.user.id
      }
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} wallet`;
  }

  async update(id: string, updateWalletDto: UpdateWalletDto) {
    const walletValues = pick(updateWalletDto, ['name', 'description', 'amount']);
    return this.prismaService.wallet.update({
      where: { id },
      data: walletValues
    });
  }

  remove(id: string) {
    return `This action removes a #${id} wallet`;
  }
}
