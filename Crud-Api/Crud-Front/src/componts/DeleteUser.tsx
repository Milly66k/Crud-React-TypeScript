import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importe useParams e useNavigate
import axios from 'axios'; // Importe o módulo axios

const DeleteUser: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate(); // Use useNavigate para navegação

  const handleDelete = () => {
    // Implemente a lógica para enviar a solicitação de exclusão do usuário para o backend
    axios
      .delete(`/usuarios/${userId}`)
      .then((response) => {
        // Se a exclusão for bem-sucedida, você pode redirecionar para a lista de usuários
        navigate('/lista-de-usuarios');
      })
      .catch((error) => {
        // Em caso de erro, você pode exibir uma mensagem de erro para o usuário
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
