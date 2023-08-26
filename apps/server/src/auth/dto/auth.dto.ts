import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class AuthDto {
  name?: string;

  @IsEmail({}, { message: "Provided email is invalid" })
  email: string;

  @IsNotEmpty({ message: "Password is required" })
  password: string;
}
