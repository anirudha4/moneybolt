import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { AccessTokensService } from "./access-tokens/access-tokens.service";
import { isEmpty } from "lodash";
import { RequestWithUserDto } from "src/users/users.dto";
import { IncomingHttpHeaders } from "http";
import { CookieOptions, Response } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UsersService,
    private accessTokenService: AccessTokensService
  ) {}

  getAccessTokenFromHeaders(cookies: CookieOptions): string {
    return cookies["access_token"];
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RequestWithUserDto = context.switchToHttp().getRequest();

    // get access token from request headers
    const access_token = this.getAccessTokenFromHeaders(request.cookies);
    if (isEmpty(access_token)) return false;

    // verify access_token
    const user = await this.accessTokenService.verifyAccessToken(access_token);

    if (isEmpty(user)) return false;

    request.user = user;
    return true;
  }
}
