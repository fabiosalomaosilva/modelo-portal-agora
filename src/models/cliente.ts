import {
  Administrador,
  ContaBancaria,
  Controlador,
  PessoaProprietaria,
  Procurador,
  EmissorOrdem,
} from './conta';

export interface Cliente {
  nomeUsuario: string;
  principalObjetivoComercial: string;
  telefone: string;
  ramal?: number;
  email: string;
  confirmarEmail: string;
  cnpj: string;
  denominacaoComercial: string;
  dataConstituicao?: string;
  formaConstituicao: string;
  nire?: number;
  principalObjetoSocial: string;
  principalAtividade: string;
  possuiVinculocomAgora: string;
  cep?: number;
  endereco: string;
  numero: string;
  complemento?: string;
  bairro: string;
  estado: string;
  cidade: string;
  informacoesSocietarias: string;
  operoCarteira: string;
  contasBancarias: ContaBancaria[];
  aplicacaoFinanceira?: number;
  emprestimosFinanciamentos?: number;
  patrimonioLiquido?: number;
  faturamento?: number;
  tipoEnderecoCorrespondencia: string;
  especificacaoEnderecoCorrespondencia: string;
  controladores: Controlador[];
  pessoasProprietarias: PessoaProprietaria[];
  administradores: Administrador[];
  procuradores?: Procurador[];
  emissoresOrdem: EmissorOrdem[];
}
