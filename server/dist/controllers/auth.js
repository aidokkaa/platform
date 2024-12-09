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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt = require('bcrypt');
const userModel_1 = require("../models/userModel");
const registerUser = (firstName, lastName, email, password, gender) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email) {
        throw new Error("Email is required");
    }
    const hashedPass = yield bcrypt.hash(password, 10);
    const newUser = yield (0, userModel_1.createUser)(firstName, lastName, email, hashedPass, gender);
    return newUser;
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userModel_1.findUserByEmail)(email);
        console.log('loginUser', user);
        if (!user) {
            console.log('User not found');
            return null;
        }
        const isPasswordValid = yield bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Incorrect password');
            return null;
        }
        return user;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.loginUser = loginUser;
