'use client'
import { useRouter} from 'next/navigation'
import React, { useState, ChangeEvent } from 'react';
import api from '@/libs/api/api';
import styles from '../app/page.module.css';



interface FormData {
  name: string;
  email: string;
  phone: string;
}

const AddUser: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '' });
  const router = useRouter();

  const handleSubmit = () => {
    api
      .post('/usuarios', formData)
      .then((response) => {
        router.push('http://localhost:3001');
      })
      .catch((error) => {
        console.error('Erro ao criar o usuário:', error);
      });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={styles['add-user-container']}>
      <h2>Adicionar Usuário</h2>
      <div>
        <label>Nome:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} className={styles['add-user-input']} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={styles['add-user-input']} />
      </div>
      <div>
        <label>Telefone:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={styles['add-user-input']} />
      </div>
      <button onClick={handleSubmit} className={styles['add-user-button']}>
        Criar Usuário
      </button>
    </div>
  );
};

export default AddUser;