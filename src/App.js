import React, { useEffect, useState } from 'react';
import api from './services/api';
import './styles.css';

function App() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    api.get('repositories').then((value) => setProjects(value.data));
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: 'OvelhaRunner',
      url: 'https://github.com/adailsonaguiar/OvelhaRunner',
      techs: ['ReactJs', 'React Native', 'NodeJs'],
    });
    if (response) {
      setProjects([...projects, response.data]);
    }
  }

  async function handleRemoveRepository(id) {
    // TODO
    const projectIndex = projects.findIndex((project) => project.id === id);
    const newArray = projects;
    if (projectIndex > -1) {
      newArray.splice(projectIndex, 1);
      await api.delete(`repositories/${id}`);
      console.log('teste teste', newArray);
      setProjects([...newArray]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
