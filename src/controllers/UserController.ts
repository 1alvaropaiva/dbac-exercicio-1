import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import { v4 as uuidv4 } from "uuid";
import { UserDTO } from "../routes/user.dto.js";

class UserController {
    constructor() {
        this.getAll = this.getAll.bind(this);
        this.getByID = this.getByID.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.destroy = this.destroy.bind(this);
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users: Array<UserDTO> = (await User.findAll()) as unknown as Array<UserDTO>;
            res.json(users);
        } catch (err) {
            next(err);
        }
    }


    async getByID(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user: UserDTO | null = (await User.findByPk(id)) as unknown as UserDTO | null;
            if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
            res.json(user);
        } catch (err) {
            next(err);
        }
    }


    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { nome, cpf, dataNascimento } = req.body;

            if (!nome || !cpf) {
                return res.status(400).json({ error: "Nome e CPF são obrigatórios" });
            }

            const newUser: UserDTO = (await User.create({
                id: uuidv4(),
                nome,
                cpf,
                dataNascimento: new Date(dataNascimento),
            })) as unknown as UserDTO;

            res.status(201).json(newUser);
        } catch (err) {
            next(err);
        }
    }


    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { nome, cpf, dataNascimento } = req.body;

            const user = await User.findByPk(id);
            if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

            await User.update(
                {
                    nome,
                    cpf,
                    dataNascimento: new Date(dataNascimento),
                },
                { where: { id } }
            );

            res.status(200).json({ message: `Usuário ${nome} atualizado com sucesso!` });
        } catch (err) {
            next(err);
        }
    }

    async destroy(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await User.destroy({ where: { id } });
            res.status(200).json({ message: `Usuário deletado com sucesso!` });
        } catch (err) {
            next(err);
        }
    }
}

export default new UserController();