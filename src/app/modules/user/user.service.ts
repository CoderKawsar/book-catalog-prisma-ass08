import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { selectedFields } from "./user.constant";

const getAllUsers = async (): Promise<Omit<User, "password">[]> => {
  const result = await prisma.user.findMany({
    select: selectedFields,
  });
  return result;
};

const getSingleUser = async (
  id: string
): Promise<Omit<User, "password"> | null> => {
  const result = await prisma.user.findFirst({
    where: { id },
    select: selectedFields,
  });
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<Omit<User, "password">>
): Promise<Omit<User, "password">> => {
  const result = await prisma.user.update({
    where: { id },
    data: payload,
    select: selectedFields,
  });

  return result;
};

const deleteUser = async (id: string): Promise<Omit<User, "password">> => {
  const result = await prisma.user.delete({
    where: { id },
    select: selectedFields,
  });

  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
