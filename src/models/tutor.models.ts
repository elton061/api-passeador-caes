// importando a funcao para gerar os uuid
import { v4 as uuidv4 } from 'uuid'; 

//definindo dados do tutor que irao ser recebidos
// o '?' e usado para definir valores nao obrigatorios. Neste caso como iremos receber os valores alguns atributos nao serao obrigatorios como id que sera gerado automaticamente.
export interface TutorPropriedades {
    id?: string;
    nome: string;
    data_nasc: string;
    cpf: string;
    email: string;
    telefone?: string;
    endereco?: string;
}

// de acordo com as propriedades definidas e criado a classe tutor
export class Tutor {
    public id?: string;
    public nome: string;
    public data_nasc: string;
    public cpf: string;
    public email: string;
    public telefone?: string;
    public endereco?: string;

// constructor
    constructor(propriedades: TutorPropriedades){
        this.id = propriedades.id || uuidv4();
        this.nome = propriedades.nome;
        this.data_nasc = propriedades.data_nasc;
        this.cpf = propriedades.cpf;
        this.email = propriedades.email;
        this.telefone = propriedades.telefone;
        this.endereco = propriedades.endereco;
    }
}