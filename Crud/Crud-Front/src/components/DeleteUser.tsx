import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/libs/api/api';

const DeleteUser: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate(); 

  const handleDelete = () => {
    api
      .delete(`/usuarios/${userId}`)
      .then((response) => {
        navigate('/lista-de-usuarios');
      })
      .catch((error) => {
        console.error('Erro ao excluir o usuário:', error);
      });
  };

  return (
    <div>
      <h2>Excluir Usuário</h2>
      <p>Tem certeza de que deseja excluir este usuário?</p>
      <button onClick={handleDelete}>Excluir</button>
    </div>
  );
};

export default DeleteUser;