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
exports.findUserByEmail = exports.createUser = void 0;
const db_1 = require("../db");
const createUser = (firstName, lastName, email, hashedPass, gender) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.pool.query('INSERT INTO users (first_name, last_name, email, password, gender) VALUES ($1, $2, $3, $4, $5) RETURNING *', [firstName, lastName, email, hashedPass, gender]);
    console.log(result.rows[0]);
    return result.rows[0];
});
exports.createUser = createUser;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.pool.query('SELECT * FROM public.users WHERE email=$1', [email]);
    return result.rows[0] || null;
});
exports.findUserByEmail = findUserByEmail;
