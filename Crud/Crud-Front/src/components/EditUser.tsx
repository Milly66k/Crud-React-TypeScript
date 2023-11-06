'use client'
import React, { useState, ChangeEvent } from 'react';
import api from '@/libs/api/api';
import styles from '../app/page.module.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  userId: number; 
}

const EditUser: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    userId: 0, 
  });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = () => {
    const userId = formData.userId; // Obtém o ID do usuário do estado

    if (userId <= 0) {
      setErrorMessage('ID de usuário inválido.');
      return;
    }

    const updatedData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    };

    api
      .put(`/usuarios/${userId}`, updatedData)
      .then((response) => {
        // Tratamento de sucesso
        setErrorMessage('Usuário atualizado com sucesso.'); // Exemplo de mensagem de sucesso
      })
      .catch((error) => {
        setErrorMessage('Erro ao atualizar usuário. Por favor, tente novamente.');
      });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={styles['edit-user-container']}>
      <h2 className={styles['edit-user-heading']}>Editar Usuário</h2>
      <div>
        <label>ID do Usuário:</label>
        <input
          type="number"
          name="userId"
          value={formData.userId}
          onChange={(e) => setFormData({ ...formData, userId: Number(e.target.value) })}
          className={styles['edit-user-input']}
        />
      </div>
      <div>
        <label>Nome:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} className={styles['edit-user-input']} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={styles['edit-user-input']} />
      </div>
      <div>
        <label>Telefone:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={styles['edit-user-input']} />
      </div>
      {errorMessage && <p className={styles['edit-user-error']}>{errorMessage}</p>}
      <button onClick={handleSubmit} className={styles['edit-user-button']}>
        Atualizar
      </button>
    </div>
  );
};

export default EditUser;