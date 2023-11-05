import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate

interface FormData {
  name: string;
  email: string;
  phone: string;
}

const EditUser: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '' });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const navigate = useNavigate(); // Use useNavigate para navegação

  const handleSubmit = () => {
    const userId = 1; // Exemplo de ID do usuário
    const updatedData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    };

    axios
      .put(`/usuarios/${userId}`, updatedData)
      .then((response) => {
        // Se a atualização for bem-sucedida, você pode redirecionar para a lista de usuários
        navigate('/lista-de-usuarios'); // Use navigate para redirecionar

      })
      .catch((error) => {
        // Em caso de erro, você pode exibir uma mensagem de erro para o usuário
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
