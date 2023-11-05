import { Request, Response } from 'express';
import { knex } from '../DB/conexao';



export async function listar(req: Request, res: Response) {
    try {
        const usuarios = await knex('usuarios');
        return res.status(200).json(usuarios);
    } catch (error: any) {
        return res.status(400).json({ mensagem: 'Erro ao listar usuários', erro: error.message });
    }
};

export async function obter(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const usuario = await knex('usuarios').where({ id }).first();

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        return res.status(200).json(usuario);
    } catch (error: any) {
        return res.status(400).json({ mensagem: 'Erro ao obter usuário', erro: error.message });
    }
};

export async function cadastrar(req: Request, res: Response) {
    const { name, email, phone } = req.body;
    try {
        if (!name || !email || !phone) {
            return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
        }

        const [usuario] = await knex('usuarios')
            .insert({
                name,
                email,
                phone,
                created_at: knex.raw('NOW()'),
            })
            .returning('*');

        if (!usuario) {
            return res.status(400).json({ mensagem: 'Não foi possível cadastrar o usuário' });
        }

        return res.status(200).json({ mensagem: 'Usuário cadastrado com sucesso', usuario });
    } catch (error: any) {
        return res.status(400).json({ mensagem: 'Erro ao cadastrar usuário', erro: error.message });
    }
};

export async function atualizar(req: Request, res: Response) {
    const { name, email, phone } = req.body;
    const { id } = req.params;

    try {
        if (!name || !email || !phone) {
            return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
        }

        const usuarioExiste = await knex('usuarios').where({ id }).first();

        if (!usuarioExiste) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        const [usuario] = await knex('usuarios')
            .update({
                name,
                email,
                phone,
                updated_at: knex.raw('NOW()'),
            })
            .where({ id })
            .returning('*');

        if (!usuario) {
            return res.status(400).json({ mensagem: 'Não foi possível atualizar o usuário' });
        }

        return res.status(200).json({ mensagem: 'Usuário atualizado com sucesso', usuario });
    } catch (error: any) {
        return res.status(400).json({ mensagem: 'Erro ao atualizar usuário', erro: error.message });
    }
};


export async function excluir(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const usuarioExiste = await knex('usuarios').where({ id }).first();

        if (!usuarioExiste) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        const [usuario] = await knex('usuarios')
            .update({
                deleted_at: knex.raw('NOW()'),
            })
            .where({ id })
            .returning('*');

        if (!usuario) {
            return res.status(400).json({ mensagem: 'Não foi possível excluir o usuário' });
        }

        return res.status(200).json({ mensagem: 'Usuário excluído com sucesso', usuario });
    } catch (error: any) {
        return res.status(400).json({ mensagem: 'Erro ao excluir usuário', erro: error.message });
    }
};


export default {
    listar,
    obter,
    cadastrar,
    atualizar,
    excluir,
};
