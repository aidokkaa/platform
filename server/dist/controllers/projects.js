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
exports.updateProject = exports.getProjects = exports.getProject = exports.createProject = void 0;
const db_1 = require("../db");
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, start_date, end_date, status, user_id } = req.body;
    try {
        const result = yield db_1.pool.query('INSERT INTO projects (name,description,start_date,end_date,status,user_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [name, description, start_date, end_date, status, user_id]);
        res.status(200).json(result.rows[0]);
        console.log(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при создании проекта' });
    }
});
exports.createProject = createProject;
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield db_1.pool.query('SELECT * FROM projects WHERE id=$1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json('Project not found!');
        }
        return res.status(200).json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getProject = getProject;
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.pool.query('SELECT * FROM projects');
    res.status(200).json(result.rows);
});
exports.getProjects = getProjects;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { name, description, start_date, end_date, status, user_id } = req.body;
    try {
        const result = yield db_1.pool.query('UPDATE projects SET name=$1, description=$2, start_date=$3, end_date=$4, status=$5, user_id=$6 WHERE id=$7 RETURNING *', [name, description, start_date, end_date, status, user_id, id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Project not found!' });
        }
        return res.status(200).json(result.rows[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при обновлении проекта' });
    }
});
exports.updateProject = updateProject;
