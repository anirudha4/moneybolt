import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { accessTokenDto } from "./dto/access-token.dto";
import { user_account } from "@prisma/client";
import { isEmpty, omit } from "lodash";

@Injectable()
export class AccessTokensService {
  constructor(private prisma: PrismaService, private jwt: JwtService) { }
  async signAccessToken(payload: accessTokenDto, ip?: string) {
    // check if access_token is already dispatched to user
    /**
     * - make the access_tokens IP based. there should only be one access_token per user per IP
     * - setup index for (user_id, IP) in access_token
     */
    let dispatchedAccessToken = await this.prisma.access_token.findFirst({
      where: {
        userId: payload.sub,
      },
    });

    if (dispatchedAccessToken)
      await this.prisma.access_token.deleteMany({
        where: {
          id: dispatchedAccessToken.id,
        },
      });
    // create new access_token and store it in database
    let access_token = await this.jwt.signAsync(
      { ...payload, ip },
      {
        secret: process.env.JWT_SECRET,
      }
    );

    await this.prisma.access_token.create({
      data: {
        token: access_token,
        userId: payload.sub,
      },
    });
    return access_token;
  }

  async verifyAccessToken(access_token: string): Promise<user_account> {
    const payload: accessTokenDto = await this.jwt.verifyAsync(access_token, {
      secret: process.env.JWT_SECRET,
    });
    let user = await this.prisma.user_account.findUnique({
      where: {
        id: payload.sub,
      },
    });

    if (isEmpty(user)) return null;

    const dispatchedToken = await this.prisma.access_token.findFirst({
      where: {
        token: access_token,
        userId: user.id,
      },
    });

    if (isEmpty(dispatchedToken)) return null;
    user = omit(user, ["password"]);
    return user;
  }
}
