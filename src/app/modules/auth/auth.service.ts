import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import bcrypt from "bcrypt";
import { ILoginUser } from "./auth.interface";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

const signUp = async (data: User) => {
  const { password, ...otherData } = data;

  // Generate a salt synchronously
  const saltRounds = parseInt(config.bcrypt_salt_rounds as string) || 10;
  const salt = bcrypt.genSaltSync(saltRounds);

  // Hash the password synchronously
  const hashedPassword = bcrypt.hashSync(password, salt);

  // creating user
  const result = await prisma.user.create({
    data: { ...otherData, password: hashedPassword },
  });

  // separating password and others data
  const { password: createdPass, ...dataWithoutPassword } = result;

  // returning others data
  return dataWithoutPassword;
};

const login = async (loginInfo: ILoginUser) => {
  const { email, password } = loginInfo;

  const isUserExist = await prisma.user.findFirst({
    where: { email },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Invalid user!");
  }

  // compare password
  const isPasswordMatched = bcrypt.compareSync(
    password,
    isUserExist?.password as string
  );

  // if password doesn't match, throw error
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials!");
  }

  // Get the current date as a JavaScript Date object
  const currentDate = new Date();

  // Calculate the date one year ago
  const oneYearAgo = new Date(currentDate);
  oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

  // Convert the oneYearAgo date to a Unix timestamp (seconds since Jan 1, 1970)
  const iatTimestamp = Math.floor(oneYearAgo.getTime() / 1000);

  // creating payload for token
  const payload = {
    role: isUserExist.role,
    userId: isUserExist.id,
    iat: iatTimestamp,
  };

  // creating token
  const token = jwtHelpers.createToken(
    payload,
    config.jwt.secret as string,
    "1y"
  );

  return { isPasswordMatched, token };
};

export const AuthService = {
  signUp,
  login,
};
