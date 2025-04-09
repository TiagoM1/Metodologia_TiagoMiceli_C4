import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getCursos = () => API.get('/cursos');
export const getCursoById = (id: string) => API.get(`/cursos/${id}`);