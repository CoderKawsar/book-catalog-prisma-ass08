"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleClientError = (error) => {
    var _a;
    let errors = [];
    let message = "";
    const statusCode = 400;
    if (error.code === "P2025") {
        message = ((_a = error.meta) === null || _a === void 0 ? void 0 : _a.cause) || "Record not found!";
        errors = [
            {
                path: "",
                message,
            },
        ];
    }
    else if (error.code === "P2003") {
        // if delete not succeeded for foreign key constraints
        if (error.message.includes("delete()` invocation:")) {
            message = "Delete failed!";
            errors = [
                {
                    path: "",
                    message,
                },
            ];
        }
    }
    return {
        statusCode,
        message: error.message,
        errorMessages: errors,
    };
};
exports.default = handleClientError;
