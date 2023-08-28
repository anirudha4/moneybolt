import { PartialType } from "@nestjs/mapped-types";
import { CreateOrganizationDto } from "./create-organization.dto";
import { IsNotEmpty } from "class-validator";

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {
    @IsNotEmpty()
    id: string
    
    @IsNotEmpty()
    name: string
}
