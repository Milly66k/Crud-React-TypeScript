import React, { useState, ChangeEvent } from 'react';
import api from '@/libs/api/api';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate

interface FormData {
  name: string;
  email: string;
  phone: string;
}

const EditUser: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '' });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const navigate = useNavigate(); 

  const handleSubmit = () => {
    const userId = 1; 
    const updatedData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    };

    api
      .put(`/usuarios/${userId}`, updatedData)
      .then((response) => {
      
        navigate('/lista-de-usuarios'); 

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
    <div>
      <h2>Editar Usuário</h2>
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
      {errorMessage && <p>{errorMessage}</p>}
      <button onClick={handleSubmit}>Atualizar</button>
    </div>
  );
};

export default EditUser;