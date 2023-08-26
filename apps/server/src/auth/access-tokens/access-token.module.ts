import { Global, Module } from "@nestjs/common";
import { AccessTokensService } from "./access-tokens.service";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Global()
@Module({
  providers: [AccessTokensService, JwtService],
  exports: [AccessTokensService],
  imports: [JwtModule],
})
export class AccessTokensModule {}
