'use client'
import React, { useState } from 'react';
import api from '@/libs/api/api';
import { useRouter } from 'next/navigation';
import styles from '../app/page.module.css'; 


const DeleteUser: React.FC = () => {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');

  const handleDelete = () => {
    if (userId === '') {
      alert('Por favor, insira o ID do usuário que deseja excluir.');
      return;
    }

    api
      .delete(`/usuarios/${userId}`)
      .then((response) => {
        setDeleteMessage('Usuário excluído com sucesso.');
        setTimeout(() => {
          setDeleteMessage(''); // Limpa a mensagem após alguns segundos
          router.push('http://localhost:3001');
        }, 3000); // A mensagem será limpa após 3 segundos
      })
      .catch((error) => {
        setDeleteMessage('Erro ao excluir o usuário. Por favor, tente novamente.');
      });
  };

  return (
    <div className={styles['delete-user-container']}>
      <h2 className={styles['delete-user-title']}>Excluir Usuário</h2>
      <p className={styles['delete-user-message']}>Tem certeza de que deseja excluir este usuário?</p>
      <input
        type="text"
        placeholder="Digite o ID do usuário a ser excluído"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className={styles['delete-user-input']}
      />
      <button onClick={handleDelete} className={styles['delete-user-button']}>
        Excluir
      </button>
      {deleteMessage && <p className={styles['delete-user-message']}>{deleteMessage}</p>} {/* Exibe a mensagem de exclusão */}
    </div>
  );
};

export default DeleteUser;