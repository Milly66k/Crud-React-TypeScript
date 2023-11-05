import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate
import axios from 'axios';

interface FormData {
  name: string;
  email: string;
  phone: string;
}

const AddUser: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '' });
  const navigate = useNavigate(); // Use useNavigate para navegação

  const handleSubmit = () => {
    // Implemente a lógica para enviar os dados do novo usuário para o backend
    axios
      .post('/usuarios', formData)
      .then((response) => {
        // Se a criação for bem-sucedida, você pode redirecionar para a lista de usuários
        navigate('/lista-de-usuarios');
      })
      .catch((error) => {
        // Em caso de erro, você pode exibir uma mensagem de erro para o usuário
        console.error('Erro ao criar o usuário:', error);
      });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Adicionar Usuário</h2>
      <div>
        <label>Nome:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
      </div>
      <div>
        <label>Telefone:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
      </div>
      <button onClick={handleSubmit}>Salvar</button>
    </div>
  );
};

export default AddUser;
