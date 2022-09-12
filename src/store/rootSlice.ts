import {
  ContaBancaria,
  Controlador,
  Nif,
  PessoaProprietaria,
} from './../models/conta';
import { createSlice } from '@reduxjs/toolkit';
import { Cliente } from '../models/cliente';
import { v4 as uuidv4 } from 'uuid';
import {
  initialSelectedPessoaProprietaria,
  initialSelectedControlador,
  intialDataCliente,
  initialFatca,
  initialFatcas,
} from './initialValues';

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

interface ActionPessoaProprietaria {
  type: string;
  payload: PessoaProprietaria;
}
interface ActionUpdateControlador {
  type: string;
  payload: { field: string; value: any };
}
interface ActionFatca {
  type: string;
  payload: Nif;
}
const local = JSON.parse(localStorage.getItem('currentClient') as string);
const initialState: Cliente =
  local !== null && local !== '' ? local : intialDataCliente;

const rootSlice = createSlice({
  name: 'root',
  initialState: {
    cliente: initialState,
    selectedControladora: initialSelectedControlador,
    selectedPessoaProprietaria: initialSelectedPessoaProprietaria,
    selectedFatca: initialFatca,
    showPanelControladoras: false,
    showPanelPessoaProprietaria: false,
    showMenuControladora: true,
    showFormFatca: false,
    textoMenuControladoraPessoaProprietaria:
      'Controladora ou pessoa proprietária',
    nifsTemp: initialFatcas,
  },
  reducers: {
    setShowFormFatca: (state) => {
      state.showFormFatca = true;
    },
    setHideFormFatca: (state) => {
      state.showFormFatca = false;
      state.selectedFatca = initialFatca;
    },
    setShowPanelControladoras: (state) => {
      state.showPanelControladoras = true;
      state.showPanelPessoaProprietaria = false;
      state.showMenuControladora = false;
      state.textoMenuControladoraPessoaProprietaria =
        'Cadastro de controladora';
    },
    setHidePanelControladoras: (state) => {
      state.showPanelControladoras = false;
      state.showPanelPessoaProprietaria = false;
      state.showMenuControladora = true;
      state.selectedControladora = initialSelectedControlador;
      state.textoMenuControladoraPessoaProprietaria =
        'Controladora ou pessoa proprietária';
    },
    setShowPanelPessoaProprietaria: (state) => {
      state.showPanelControladoras = false;
      state.showPanelPessoaProprietaria = true;
      state.showMenuControladora = false;
      state.textoMenuControladoraPessoaProprietaria =
        'Cadastro de pessoa proprietária';
    },
    setHidePanelPessoaProprietaria: (state) => {
      state.showPanelControladoras = false;
      state.showPanelPessoaProprietaria = false;
      state.showMenuControladora = true;
      state.selectedPessoaProprietaria = initialSelectedPessoaProprietaria;
      state.textoMenuControladoraPessoaProprietaria =
        'Controladora ou pessoa proprietária';
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
    addPessoaProprietaria: (state, action: ActionPessoaProprietaria) => {
      state.cliente.pessoasProprietarias.push(action.payload);
      localStorage.setItem('currentClient', JSON.stringify(state.cliente));
    },
    updatePessoaProprietaria: (state, action: ActionPessoaProprietaria) => {
      const index = state.cliente.pessoasProprietarias.findIndex(
        (c) => c.id === action.payload.id
      );
      var item = state.cliente.pessoasProprietarias[index];
      item = action.payload;
      state.cliente.pessoasProprietarias[index] = item;
      localStorage.setItem('currentClient', JSON.stringify(state.cliente));
    },
    deletePessoaProprietaria: (state, action: ActionPessoaProprietaria) => {
      const index = state.cliente.pessoasProprietarias.findIndex(
        (c) => c.id === action.payload.id
      );
      state.cliente.pessoasProprietarias.splice(index, 1);
      localStorage.setItem('currentClient', JSON.stringify(state.cliente));
    },
    addFatca: (state, action: ActionFatca) => {
      state.nifsTemp.push(action.payload);
      localStorage.setItem('currentClient', JSON.stringify(state.cliente));
    },
    updateFatca: (state, action: ActionFatca) => {
      const index = state.nifsTemp.findIndex((c) => c.id === action.payload.id);
      var item = state.nifsTemp[index];
      item = action.payload;
      state.nifsTemp[index] = item;
      localStorage.setItem('currentClient', JSON.stringify(state.cliente));
    },
    deleteFatca: (state, action: ActionFatca) => {
      const index = state.nifsTemp.findIndex((c) => c.id === action.payload.id);
      state.nifsTemp.splice(index, 1);
      localStorage.setItem('currentClient', JSON.stringify(state.cliente));
    },
    setSelectedControlador: (state, action: ActionControlador) => {
      state.showPanelControladoras = true;
      state.showPanelPessoaProprietaria = false;
      state.showMenuControladora = false;
      state.textoMenuControladoraPessoaProprietaria =
        'Cadastro de controladora';
      state.selectedControladora = action.payload;
    },
    setSelectedPessoaProprietaria: (state, action: ActionPessoaProprietaria) => {
      state.showPanelControladoras = false;
      state.showPanelPessoaProprietaria = true;
      state.showMenuControladora = false;
      state.textoMenuControladoraPessoaProprietaria =
        'Cadastro de Pessoa Proprietaria';
      state.selectedPessoaProprietaria = action.payload;
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
  setShowPanelPessoaProprietaria,
  setHidePanelPessoaProprietaria,
  setCliente,
  addContaBancaria,
  deleteContaBancaria,
  addControladora,
  updateControladora,
  deleteControladora,
  addPessoaProprietaria,
  updatePessoaProprietaria,
  deletePessoaProprietaria,
  setSelectedControlador,
  setSelectedPessoaProprietaria,
  updateSelectedControlador,
  cleanCliente,
  setShowFormFatca,
  setHideFormFatca,
  addFatca,
  updateFatca,
  deleteFatca,
} = rootSlice.actions;
export default rootSlice.reducer;
