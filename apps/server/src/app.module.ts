import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { OrganizationsModule } from "./organizations/organizations.module";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { AccessTokensModule } from "./auth/access-tokens/access-token.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../", "public")
    }),
    ConfigModule.forRoot(),
    OrganizationsModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    AccessTokensModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
