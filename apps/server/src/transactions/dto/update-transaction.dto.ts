import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { IsIn, IsNotEmpty, IsOptional, IsPositive, Max } from 'class-validator';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
    @IsNotEmpty()
    id: string;
    
    @IsNotEmpty()
    name: string;

    @IsPositive({ message: "Amount must be greater than 0" })
    @Max(100000000, { message: "Amount must be less than Rs. 10,00,00,000" })
    amount: number;

    @IsOptional()
    description?: string;

    @IsIn(['expense', 'income', 'investment'])
    type: string;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    date: string
}
