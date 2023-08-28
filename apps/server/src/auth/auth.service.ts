import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
// DTO
import { AuthDto } from "./dto";
// SERVICE
import { PrismaService } from "src/prisma/prisma.service";
import { UsersService } from "src/users/users.service";
import { isEmpty, omit } from "lodash";
import { AccessTokensService } from "./access-tokens/access-tokens.service";
import { accessTokenDto } from "./access-tokens/dto/access-token.dto";
import { RequestWithUserDto } from "src/users/users.dto";
import { user_account } from "@prisma/client";
import { CategoriesService } from "src/categories/categories.service";
import { CATEGORIES } from "src/utils/constants";
import { OrganizationsService } from "src/organizations/organizations.service";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private userService: UsersService,
        private accessTokenService: AccessTokensService
    ) { }
    async createUser(credentials: AuthDto) {
        const user = await this.prisma.user_account.create({
            data: {
                email: credentials.email,
                password: await this.hashPassword(credentials.password),
                name: credentials.name,
                organization: {
                    create: {
                        name: credentials.email.split("@")[0],
                        category: {
                            createMany: {
                                data: CATEGORIES.map((category) => {
                                    return {
                                        ...category
                                    };
                                })
                            }
                        },
                    },
                }
            }
        });

        return { user };
    }

    async login(credentials: AuthDto, req: RequestWithUserDto) {
        const { email, password } = credentials;

        let user = await this.userService.findUser({ email });
        if (isEmpty(user)) throw new UnauthorizedException("Invalid email or password. Please try again.");

        const matchPassword = await this.comparePasswords(password, user.password);

        if (!matchPassword)
            throw new UnauthorizedException("Invalid email or password. Please try again.");

        const payload: accessTokenDto = {
            sub: user.id,
            email: user.email,
        };
        const access_token = await this.accessTokenService.signAccessToken(
            payload,
            req.ip
        );
        const userToSend = omit(user, ["password"]);
        return { user: userToSend, access_token };
    }
    //
    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }
    async comparePasswords(
        password: string,
        hashedPassword: string
    ): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    async logout(
        user: user_account
    ): Promise<void> {
        const accessToken = await this.prisma.access_token.findFirst({
            where: {
                userId: user.id
            }
        });

        await this.prisma.access_token.delete({
            where: {
                id: accessToken.id
            }
        });
    }
}
