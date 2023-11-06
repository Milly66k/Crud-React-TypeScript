import { Request, Response } from 'express';
import { knex } from '../DB/conexao';

// Listar todos os usuários
export async function listar(req: Request, res: Response) {
    try {
        const { ordem } = req.query;
        let usuarios;

        if (ordem === 'asc') {
            usuarios = await knex('usuarios').orderBy('created_at', 'asc');
        } else if (ordem === 'desc') {
            usuarios = await knex('usuarios').orderBy('created_at', 'desc');
        } else {
            usuarios = await knex('usuarios');
        }

        return res.status(200).json(usuarios);
    } catch (error: any) {
        return res.status(400).json({ mensagem: 'Erro ao listar usuários', erro: error.message });
    }
}

// Obter um usuário por ID
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
}

// Criar um usuário
export async function cadastrar(req: Request, res: Response) {
    const { name, email, phone } = req.body;
    try {
        if (!name || !email || !phone) {
            return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
        }

        // Verifique se o email já existe
        const emailExistente = await knex('usuarios').where({ email }).first();
        if (emailExistente) {
            return res.status(400).json({ mensagem: 'O email já está em uso' });
        }

        // Verifique se o telefone já está em uso
        const phoneExistente = await knex('usuarios').where({ phone }).first();
        if (phoneExistente) {
            return res.status(400).json({ mensagem: 'O telefone já está em uso' });
        }

        const [usuario] = await knex('usuarios')
            .insert({
                name,
                email,
                phone,
                created_at: knex.raw('NOW()'),
            })
            .returning('*');

        return res.status(200).json({ mensagem: 'Usuário cadastrado com sucesso', usuario });
    } catch (error: any) {
        return res.status(400).json({ mensagem: 'Erro ao cadastrar usuário', erro: error.message });
    }
}

// Atualizar um usuário
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

        if (usuarioExiste.deleted_at) {
            return res.status(400).json({ mensagem: 'Usuário não pode ser editado, pois foi excluído' });
        }

        // Verifique se o email já existe, excluindo o próprio usuário atual
        const emailExistente = await knex('usuarios').where({ email }).whereNot({ id }).first();
        if (emailExistente) {
            return res.status(400).json({ mensagem: 'O email já está em uso' });
        }

        // Verifique se o telefone já está em uso, excluindo o próprio usuário atual
        const phoneExistente = await knex('usuarios').where({ phone }).whereNot({ id }).first();
        if (phoneExistente) {
            return res.status(400).json({ mensagem: 'O telefone já está em uso' });
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

        return res.status(200).json({ mensagem: 'Usuário atualizado com sucesso', usuario });
    } catch (error: any) {
        return res.status(400).json({ mensagem: 'Erro ao atualizar usuário', erro: error.message });
    }
}

// Excluir um usuário
export async function excluir(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const usuarioExiste = await knex('usuarios').where({ id }).first();

        if (!usuarioExiste) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        if (usuarioExiste.deleted_at) {
            return res.status(400).json({ mensagem: 'Usuário já foi excluído' });
        }

        const [usuario] = await knex('usuarios')
            .update({
                deleted_at: knex.raw('NOW()'),
            })
            .where({ id })
            .returning('*');

        return res.status(200).json({ mensagem: 'Usuário excluído com sucesso', usuario });
    } catch (error: any) {
        return res.status(400).json({ mensagem: 'Erro ao excluir usuário', erro: error.message });
    }
}

export async function filtrarPorData(req: Request, res: Response) {
    const { dataInicial, dataFinal } = req.query;
  
    try {
      let usuarios;
  
      if (dataInicial && dataFinal) {
        usuarios = await knex('usuarios')
          .where('created_at', '>=', dataInicial)
          .where('created_at', '<=', dataFinal);
      } else {
        usuarios = await knex('usuarios');
      }
  
      return res.status(200).json(usuarios);
    } catch (error: any) {
      return res.status(400).json({ mensagem: 'Erro ao filtrar por data', erro: error.message });
    }
  }
  

export default {
    listar,
    obter,
    cadastrar,
    atualizar,
    excluir,
    filtrarPorData
};
