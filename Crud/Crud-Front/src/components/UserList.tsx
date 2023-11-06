'use client'
import React, { useState, useEffect } from 'react';
import api from '@/libs/api/api';
import styles from '../app/page.module.css';

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
  const [sortBy, setSortBy] = useState<string>('asc');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // Armazenar os resultados da pesquisa

  useEffect(() => {
    api.get('/usuarios')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Erro ao obter a lista de usuários:', error);
      });
  }, []);

  const handleSearch = () => {
    api.get(`/usuarios?nome=${searchTerm}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Erro ao pesquisar usuários por nome:', error);
      });
  };

  const handleSort = () => {
    api.get(`/usuarios?ordem=${sortBy}`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Erro ao classificar usuários:', error);
      });
  };

  const handleFilterByDate = () => {
    api
      .get(`/usuarios/filtrar?dataInicial=${startDate}&dataFinal=${endDate}`)
      .then((response) => {
        setFilteredUsers(response.data);
      })
      .catch((error) => {
        console.error('Erro ao filtrar por data:', error);
      });
  };

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <div className={styles['search-and-sort']}>
        <div className={styles['search-section']}>
          <input
            type="text"
            placeholder="Pesquisar por nome"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Pesquisar</button>
        </div>
        <div className={styles['sort-section']}>
          <label>Ordenar por data de criação:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="asc">Do menor para o maior</option>
            <option value="desc">Do maior para o menor</option>
          </select>
          <button onClick={handleSort}>Ordenar</button>

          <input
            type="date"
            placeholder="Data inicial"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            placeholder="Data final"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button onClick={handleFilterByDate}>Filtrar por data</button>
        </div>
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
          {filteredUsers.length > 0
            ? filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.created_at}</td>
                  <td>{user.updated_at}</td>
                  <td>{user.deleted_at}</td>
                </tr>
              ))
            : users.map((user) => (
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
