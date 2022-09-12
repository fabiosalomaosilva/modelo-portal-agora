export interface ContaBancaria {
  tipo: string;
  agencia: number;
  conta: number;
  digito: number;
  banco: number;
  id: string;
}

export interface Controlador {
  id: string;
  razaoSocial: string;
  cnpj: string;
  participacao: number;
  controladorPai: string;
}

export interface Nif {
  id: string;
  referencia: string;
  pais: string;
  numero?: number;
  motivo?: string;
  pessoaControladoraId: string;
}

export interface PessoaProprietaria {
  id: string;
  nome: string;
  cpf: string;
  rg: number;
  orgaoEmissor: string;
  participacao: number;
  tipoVinculo?: string;
  vinculoComAgora: boolean;
  pessoaExpostaPoliticamente: boolean;
  possuiOutraNacionalidade: boolean;
  temResidenciafiscalOutroPais: boolean;
  possuiVistoPermanenteOutroPais: boolean;
  nifs?: Nif[];
  controladorPai: string;
}

export interface Administrador {
  id: string;
  nome: string;
  cpf: string;
  rg: string;
  orgaoEmissor: string;
}

export interface EmissorOrdem {
  id: string;
  nome: string;
  cpf: string;
  rg: string;
  orgaoEmissor: string;
}

export interface Procurador {
  id: string;
  nome: string;
  cpf: string;
  rg: string;
  orgaoEmissor: string;
  cep: number;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  estado: string;
  cidade: string;
  pessoaExpostaPoliticamente: boolean;
}
