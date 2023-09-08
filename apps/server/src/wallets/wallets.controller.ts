import { Controller, Get, Post, Body, Put, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { RequestWithUserDto } from 'src/users/users.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) { }

  @Post()
  async create(@Body() createWalletDto: CreateWalletDto, @Request() req: RequestWithUserDto) {
    return await this.walletsService.create(createWalletDto, req);
  }

  @Get()
  findAll(@Request() req: RequestWithUserDto) {
    return this.walletsService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return await this.walletsService.update(id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletsService.remove(id);
  }
}
