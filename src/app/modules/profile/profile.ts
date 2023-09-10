import { Request, Response, Router } from "express";
import { ENUM_USER_ROLE } from "../../../enums/users";
import auth from "../../middlewares/auth";
import catchAsync from "../../../shared/catchAsync";
import { IUserIdAndRole } from "../order/order.interface";
import prisma from "../../../shared/prisma";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { selectedFields } from "../user/user.constant";

const router = Router();

const getMyProfileController = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.user as IUserIdAndRole;

    const result = await prisma.user.findFirst({
      where: { id: userId },
      select: selectedFields,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User retrieved successfully!",
      data: result,
    });
  }
);

// get my profile router
router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  getMyProfileController
);

export const ProfileRouter = router;
