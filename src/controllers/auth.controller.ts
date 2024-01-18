import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { tokenRepository } from "../repositories";
import { authService, tokenService } from "../services";
import { ISignIn, ITokensPair, IUser } from "../types";

class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as Partial<IUser>;
      const createdUser = await authService.signUp(body);

      return res.json({ data: createdUser });
    } catch (e) {
      next(e);
    }
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as ISignIn;
      const jwtTokens = await authService.signIn(body);

      return res.json({ data: jwtTokens });
    } catch (e) {
      next(e);
    }
  }

  public async refresh(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<ITokensPair>> {
    try {
      const refreshTokenString = req.get("Authorization") as string;
      const refreshToken = refreshTokenString.split("Bearer ")[1];
      if (!refreshToken) {
        throw new ApiError("No Token!", 401);
      }

      const tokenPayload = tokenService.checkToken(refreshToken, "refresh");

      const entity = await tokenRepository.findOne({ refreshToken });

      if (!entity) {
        throw new ApiError("Token not valid!", 401);
      }

      const tokensPair = await authService.refresh(tokenPayload, refreshToken);

      return res.status(201).json(tokensPair);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
