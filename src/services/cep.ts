import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setCliente } from '../store/rootSlice';
import { cepApi } from './../api/cepApi';

export interface CepEndereco {
  endereco: string;
  bairro: string;
  estado: string;
  cidade: string;
}

export const getCep = async (cep: string) => {
    const response = await cepApi.get(`json/${cep}`);
    const endereco = {
        endereco: response.data.address,
        bairro: response.data.district,
        estado: response.data.state,
        cidade: response.data.city,        
    } as CepEndereco;
    return endereco;
};
