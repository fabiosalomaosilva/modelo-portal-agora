import { Cliente } from "../models/cliente";
import { Controlador, PessoaProprietaria } from "../models/conta";

export const intialDataCliente: Cliente = {
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
  
  export const initialSelectedControlador: Controlador = {
    id: '',
    razaoSocial: '',
    cnpj: '',
    participacao: 0,
    controladorPai: '0',
  };

  export const initialSelectedPessoaProprietaria: PessoaProprietaria = {
    id: '',
    nome: '',
    cpf: '',
    rg: 0,    
    orgaoEmissor: '',
    participacao: 0,
    vinculoComAgora: false,
    tipoVinculo: '',
    pessoaExpostaPoliticamente: false,
    possuiOutraNacionalidade: false,
    temResidenciafiscalOutroPais: false,
    possuiVistoPermanenteOutroPais: false,    
    nifs: [],
    controladorPai: '',
  };