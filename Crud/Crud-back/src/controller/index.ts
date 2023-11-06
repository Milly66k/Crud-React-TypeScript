import { Request, Response } from 'express';
import { knex } from '../DB/connection';


export async function listUser(req: Request, res: Response) {
    try {
        const { order } = req.query;
        let users;

        if (order === 'asc') {
            users = await knex('users').orderBy('created_at', 'asc');
        } else if (order === 'desc') {
            users = await knex('users').orderBy('created_at', 'desc');
        } else {
            users = await knex('users');
        }

        return res.status(200).json(users);
    } catch (error: any) {
        return res.status(400).json({ message: 'Erro ao listar usuários', error: error.message });
    }
}


export async function getUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const user = await knex('users').where({ id }).first();

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return res.status(200).json(user);
    } catch (error: any) {
        return res.status(400).json({ message: 'Erro ao obter usuário', error: error.message });
    }
}


export async function createUser(req: Request, res: Response) {
    const { name, email, phone } = req.body;
    try {
        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        // Check if the email already exists
        const existingEmail = await knex('users').where({ email }).first();
        if (existingEmail) {
            return res.status(400).json({ message: 'O email já está em uso' });
        }

        // Check if the phone is already in use
        const existingPhone = await knex('users').where({ phone }).first();
        if (existingPhone) {
            return res.status(400).json({ message: 'O telefone já está em uso' });
        }

        const [user] = await knex('users')
            .insert({
                name,
                email,
                phone,
                created_at: knex.raw('NOW()'),
            })
            .returning('*');

        return res.status(200).json({ message: 'Usuário cadastrado com sucesso', user });
    } catch (error: any) {
        return res.status(400).json({ message: 'Erro ao cadastrar usuário', error: error.message });
    }
}


export async function updateUser(req: Request, res: Response) {
    const { name, email, phone } = req.body;
    const { id } = req.params;

    try {
        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        const userExists = await knex('users').where({ id }).first();

        if (!userExists) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        if (userExists.deleted_at) {
            return res.status(400).json({ message: 'Usuário não pode ser editado, pois foi excluído' });
        }

        const existingEmail = await knex('users').where({ email }).whereNot({ id }).first();
        if (existingEmail) {
            return res.status(400).json({ message: 'O email já está em uso' });
        }

       
        const existingPhone = await knex('users').where({ phone }).whereNot({ id }).first();
        if (existingPhone) {
            return res.status(400).json({ message: 'O telefone já está em uso' });
        }

        const [user] = await knex('users')
            .update({
                name,
                email,
                phone,
                updated_at: knex.raw('NOW()'),
            })
            .where({ id })
            .returning('*');

        return res.status(200).json({ message: 'Usuário atualizado com sucesso', user });
    } catch (error: any) {
        return res.status(400).json({ message: 'Erro ao atualizar usuário', error: error.message });
    }
}


export async function removeUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const userExists = await knex('users').where({ id }).first();

        if (!userExists) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        if (userExists.deleted_at) {
            return res.status(400).json({ message: 'Usuário já foi excluído' });
        }

        const [user] = await knex('users')
            .update({
                deleted_at: knex.raw('NOW()'),
            })
            .where({ id })
            .returning('*');

        return res.status(200).json({ message: 'Usuário excluído com sucesso', user });
    } catch (error: any) {
        return res.status(400).json({ message: 'Erro ao excluir usuário', error: error.message });
    }
}

export async function filterByDate(req: Request, res: Response) {
    const { initialDate, finalDate } = req.query;

    try {
        let users;

        if (initialDate && finalDate) {
            users = await knex('users')
                .where('created_at', '>=', initialDate)
                .where('created_at', '<=', finalDate);
        } else {
            users = await knex('users');
        }

        return res.status(200).json(users);
    } catch (error: any) {
        return res.status(400).json({ message: 'Erro ao filtrar por data', error: error.message });
    }
}

export default {
    listUser,
    getUser,
    createUser,
    updateUser,
    removeUser,
    filterByDate
};
