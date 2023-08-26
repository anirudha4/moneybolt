import { user_account } from "@prisma/client";
import { Request } from "express";

export interface RequestWithUserDto extends Request {
  user?: user_account;
}
