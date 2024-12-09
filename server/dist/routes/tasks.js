"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/tasks', (req, res) => {
});
router.get('/tasks/{id}', (req, res) => {
});
router.get('/tasks', (req, res) => {
});
router.put('/tasks/{id}', (req, res) => {
});
router.delete('/tasks/{id}', (req, res) => {
});
exports.default = router;
