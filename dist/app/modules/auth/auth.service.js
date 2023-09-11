"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const signUp = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = data, otherData = __rest(data, ["password"]);
    // Generate a salt synchronously
    const saltRounds = parseInt(config_1.default.bcrypt_salt_rounds) || 10;
    const salt = bcrypt_1.default.genSaltSync(saltRounds);
    // Hash the password synchronously
    const hashedPassword = bcrypt_1.default.hashSync(password, salt);
    // creating user
    const result = yield prisma_1.default.user.create({
        data: Object.assign(Object.assign({}, otherData), { password: hashedPassword }),
    });
    // separating password and others data
    const { password: createdPass } = result, dataWithoutPassword = __rest(result, ["password"]);
    // returning others data
    return dataWithoutPassword;
});
const login = (loginInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = loginInfo;
    const isUserExist = yield prisma_1.default.user.findFirst({
        where: { email },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Invalid user!");
    }
    // compare password
    const isPasswordMatched = bcrypt_1.default.compareSync(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    // if password doesn't match, throw error
    if (!isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid credentials!");
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
    const token = jwtHelpers_1.jwtHelpers.createToken(payload, config_1.default.jwt.secret, "1y");
    return { isPasswordMatched, token };
});
exports.AuthService = {
    signUp,
    login,
};
