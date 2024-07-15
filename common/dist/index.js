"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogPost = exports.createBlogPost = exports.userSignInBody = exports.userSignUpBody = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userSignUpBody = zod_1.default.object({
    email: zod_1.default.string().trim().email(),
    password: zod_1.default.string().min(8),
    name: zod_1.default.string()
});
exports.userSignInBody = zod_1.default.object({
    email: zod_1.default.string().trim().email(),
    password: zod_1.default.string().min(8),
});
exports.createBlogPost = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
});
exports.updateBlogPost = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    id: zod_1.default.string()
});
