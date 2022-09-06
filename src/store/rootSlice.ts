import { ContaBancaria, Controlador } from './../models/conta';
import { createSlice } from '@reduxjs/toolkit';
import { Cliente } from '../models/cliente';
import { v4 as uuidv4 } from 'uuid';

interface ActionCliente {
  type: string;
  payload: Cliente;
}

interface ActionContaBancaria {
  type: string;
  payload: ContaBancaria;
}

interface ActionControlador {
  type: string;
  payload: Controlador;
}

interface ActionUpdateControlador {
  type: string;
  payload: { field: string; value: any };
}

const local = JSON.parse(localStorage.getItem('currentClient') as string);
const intialDataCliente: Cliente ={
  nomeUsuario: '',
  principalObjetivoComercial: '0',
  telefone: '',
  email: '',
  confirmarEmail: '',
  cnpj: '',
  denominacaoComercial: '',
  formaConstituicao: '',
  principalObjetoSocial: '0',
  principalAtividade: '0',
  possuiVinculocomAgora: '0',
  endereco: '',
  numero: '',
  complemento: '',
  bairro: '',
  estado: '',
  cidade: '',
  informacoesSocietarias: '',
  operoCarteira: '',
  tipoEnderecoCorrespondencia: '0',
  especificacaoEnderecoCorrespondencia: '',
  contasBancarias: [],
  controladores: [],
  administradores: [],
  pessoasProprietarias: [],
  procuradores: [],
  emissoresOrdem: [],
}; 
const initialState: Cliente =
  local !== null && local !== ''
    ? local
    : intialDataCliente;

const initiSelectedControlador: Controlador = {
  id: '',
  razaoSocial: '',
  cnpj: '',
  participacao: 0,
  controladorPai: '0',
};

const rootSlice = createSlice({
  name: 'root',
  initialState: {
    cliente: initialState,
    selectedControladora: initiSelectedControlador,
    showPanelControladoras: false,
  },
  reducers: {
    setShowPanelControladoras: (state) => {
      state.showPanelControladoras = true;
    },
    setHidePanelControladoras: (state) => {
      state.showPanelControladoras = false;
      state.selectedControladora = initiSelectedControlador;
    },
    setCliente: (state, action: ActionCliente) => {
      state.cliente = action.payload;
      localStorage.setItem('currentClient', JSON.stringify(state.cliente));
    },
    cleanCliente: (state) => {
      state.cliente = intialDataCliente;
      localStorage.clear();
    },
    addContaBancaria: (state, action: ActionContaBancaria) => {
      state.cliente.contasBancarias.push(action.payload);
      localStorage.setItem('currentClient', JSON.stringify(state.cliente));
    },
    deleteContaBancaria: (state, action: ActionContaBancaria) => {
      const index = state.cliente.contasBancarias.findIndex(
        (c) => c.id === action.payload.id
      );
      state.cliente.contasBancarias.splice(index, 1);
      localStorage.setItem('currentClient', JSON.stringify(state.cliente));
    },
    addControladora: (state, action: ActionControlador) => {
      let controlador = {
        id: uuidv4().toString(),
        razaoSocial: action.payload.razaoSocial,
        cnpj: action.payload.cnpj,
        participacao: action.payload.participacao,
        controladorPai: action.payload.controladorPai,
      };
      state.cliente.controladores.push(controlador);
      localStorage.setItem('currentClient', JSON.stringify(state.cliente));
    },
    updateControladora: (state, action: ActionControlador) => {
      const index = state.cliente.controladores.findIndex(
        (c) => c.id === action.payload.id
      );
      var item = state.cliente.controladores[index];
      item = action.payload;
      state.cliente.controladores[index] = item;
      localStorage.setItem('currentClient', JSON.stringify(state.cliente));
    },
    deleteControladora: (state, action: ActionControlador) => {
      const index = state.cliente.controladores.findIndex(
        (c) => c.id === action.payload.id
      );
      state.cliente.controladores.splice(index, 1);
      localStorage.setItem('currentClient', JSON.stringify(state.cliente));
    },
    setSelectedControlador: (state, action: ActionControlador) => {
      state.showPanelControladoras = true;
      state.selectedControladora = action.payload;
    },
    updateSelectedControlador: (state, action: ActionUpdateControlador) => {
      switch (action.payload.field) {
        case 'razaoSocial':
          state.selectedControladora.razaoSocial = action.payload.value;
          break;
        case 'cnpj':
          state.selectedControladora.cnpj = action.payload.value;
          break;
        case 'participacao':
          state.selectedControladora.participacao = action.payload.value;
          break;
        case 'controladorPai':
          state.selectedControladora.controladorPai = action.payload.value;
          break;
      }
    },
  },
});

export const {
  setShowPanelControladoras,
  setHidePanelControladoras,
  setCliente,
  addContaBancaria,
  deleteContaBancaria,
  addControladora,
  updateControladora,
  deleteControladora,
  setSelectedControlador,
  updateSelectedControlador,
  cleanCliente
} = rootSlice.actions;
export default rootSlice.reducer;
