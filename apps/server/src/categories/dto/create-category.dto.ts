import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    color: string;

    @IsNotEmpty()
    organizationId: string;
}
