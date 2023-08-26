import { Global, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersService } from "src/users/users.service";
import { UsersModule } from "src/users/users.module";

@Global()
@Module({
  providers: [AuthService, UsersService],
  controllers: [AuthController],
  imports: [UsersModule],
})
export class AuthModule { }
