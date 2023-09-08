import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateTransactionDto } from './create-transaction.dto';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
    @IsNotEmpty()
    id: string;
}
