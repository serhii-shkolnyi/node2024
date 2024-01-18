import { Types } from "mongoose";

export interface ITokenPayload {
  userId: Types.ObjectId;
}

export interface ITokensPair {
  accessToken: string;
  refreshToken: string;
}

export interface IToken extends ITokensPair {
  _userId: Types.ObjectId;
}
