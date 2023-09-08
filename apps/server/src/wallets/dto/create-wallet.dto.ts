import { IsNotEmpty, IsOptional, IsPositive, Max } from "class-validator";

export class CreateWalletDto {
    @IsNotEmpty()
    name: string;

    @IsPositive({ message: "Amount must be greater than 0" })
    @Max(100000000, { message: "Amount must be less than Rs. 10,00,00,000" })
    amount: number;

    @IsOptional()
    description?: string;
}