import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { User } from "@prisma/client";

const signUp = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.signUp(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User created successfully!",
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);

  res.send({
    success: true,
    statusCode: httpStatus.OK,
    message: "User signin successfully!",
    token: result.token,
  });
});

export const AuthController = {
  signUp,
  login,
};
