export interface ContaBancaria {
    tipo: string;
    agencia: number;
    conta: number;
    digito: number;
    banco: number;
    id: number;
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
    numero: number;
    motivo: string;
}

export interface PessoaProprietaria {
    id: string;
    nome: string;
    cpf: string;
    rg: number;    
    orgaoEmissor: string;
    participacao: number;
    vinculoComAgora: boolean;
    tipoVinculo: string;
    pessoaExpostaPoliticamente: boolean;
    possuiOutraNacionalidade: boolean;
    temResidenciafiscalOutroPais: boolean;
    possuiVistoPermanenteOutroPais: boolean;    
    nifs: Nif[];
    controladorPai: string;
}

export interface Administrador {
    nome: string;
    cpf: number;
    rg: number;    
    orgaoEmissor: string;
}

export interface EmissorOrdem {
    nome: string;
    cpf: number;
    rg: number;    
    orgaoEmissor: string;
}

export interface Procurador {
    nome: string;
    cpf: number;
    rg: number;    
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