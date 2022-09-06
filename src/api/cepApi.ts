import axios from 'axios';

export const cepApi = axios.create({
  baseURL: 'https://cep.awesomeapi.com.br/',
});
