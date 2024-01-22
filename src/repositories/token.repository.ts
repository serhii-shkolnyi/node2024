import { FilterQuery } from "mongoose";

import { Token } from "../models";
import { IToken } from "../types";

class TokenRepository {
  public async create(data: Partial<IToken>) {
    return await Token.create(data);
  }

  public async findOne(params: FilterQuery<IToken>): Promise<IToken> {
    return await Token.findOne(params);
  }

  public async deleteOne(params: FilterQuery<IToken>): Promise<void> {
    await Token.deleteOne(params);
  }
}

export const tokenRepository = new TokenRepository();
