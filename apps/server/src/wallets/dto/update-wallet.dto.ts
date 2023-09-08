import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateWalletDto } from './create-wallet.dto';

export class UpdateWalletDto extends PartialType(CreateWalletDto) {
    @IsNotEmpty()
    id: string;
}
