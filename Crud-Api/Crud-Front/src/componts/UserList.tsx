import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('asc'); // "asc" ou "desc"

  useEffect(() => {
    // Faça uma chamada para a API do backend para obter a lista de usuários aqui
    // Atualize o estado "users" com os dados obtidos do backend
    // Exemplo de chamada à API usando axios:
    axios.get('/usuarios')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Erro ao obter a lista de usuários:', error);
      });
  }, []);

  const handleSearch = () => {
    // Implemente a lógica de pesquisa por nome e faça a chamada para a API do backend
    // Exemplo de chamada à API usando axios para pesquisa por nome:
    axios.get(`/usuarios?nome=${searchTerm}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Erro ao pesquisar usuários por nome:', error);
      });
  };

  const handleSort = () => {
    // Implemente a lógica para classificar a lista de usuários e faça a chamada para a API do backend
    // Exemplo de chamada à API usando axios para classificação:
    axios.get(`/usuarios?ordem=${sortBy}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Erro ao classificar usuários:', error);
      });
  };

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <div>
        <input
          type="text"
          placeholder="Pesquisar por nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Pesquisar</button>
      </div>
      <div>
        <label>Ordenar por data de criação:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="asc">Do menor para o maior</option>
          <option value="desc">Do maior para o menor</option>
        </select>
        <button onClick={handleSort}>Ordenar</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Criado em</th>
            <th>Atualizado em</th>
            <th>Deletado em</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.created_at}</td>
              <td>{user.updated_at}</td>
              <td>{user.deleted_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

