import { Injectable } from "@nestjs/common";
import { user_account } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

const USER_SELECT = {
  id: true,
  email: true,
  name: true,
  password: true,
  avatarUrl: true,
  organizationId: true,
  createdAt: true,
  updatedAt: true,
  organization: {
    select: {
      id: true,
      name: true,
      updatedAt: true,
      createdAt: true,
      category: {
        select: {
          id: true,
          name: true,
          color: true
        }
      }
    }
  }
}
type Criteria = user_account | {} | null;
type UniqueCriteria = { id: string };
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findUsers(criteria: Criteria) {
    return await this.prisma.user_account.findMany({ where: criteria });
  }

  async findUser(criteria: Criteria) {
    return await this.prisma.user_account.findFirst({
      where: criteria,
      select: USER_SELECT
    });
  }

  async findUserById(criteria: UniqueCriteria) {
    return await this.prisma.user_account.findUnique({
      where: criteria,
      select: USER_SELECT
    });
  }
}
