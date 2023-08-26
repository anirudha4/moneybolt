import { Injectable } from "@nestjs/common";
import { user_account } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

type Criteria = user_account | {} | null;
type UniqueCriteria = { id: string };
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUsers(criteria: Criteria) {
    return await this.prisma.user_account.findMany({ where: criteria });
  }

  async findUser(criteria: Criteria) {
    return await this.prisma.user_account.findFirst({ where: criteria });
  }

  async findUserById(criteria: UniqueCriteria) {
    return await this.prisma.user_account.findUnique({ where: criteria });
  }
}
