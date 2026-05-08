import { z } from "zod";
// importando a funcao para gerar os uuid
import { v4 as uuidv4 } from 'uuid'; 

//definindo dados do tutor que irao ser recebidos
// a biblioteca zod ajuda a validar os valores inseridos e retorna mensagem caso nao atenda os requisitos
export const createTutorSchema = z.object ({
    id: z.string().uuid({ message: "Formato de ID invalido" }).default(() => uuidv4()),
    nome: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres"}),
    data_nasc: z.string({message: "Data de nascimento invalida" }),
    cpf: z.string().length(11, {message: "O CPF deve ter exatamente 11 digitos"}),
    email: z.string().email({ message: "Endereco de e-mail invalido"}),
    telefone: z.string().optional(),
    endereco: z.string().optional(),
});

export const updateTutorSchema = createTutorSchema.partial().omit({id: true});

export type TutorInput = z.infer<typeof createTutorSchema>;
// de acordo com as propriedades definidas e criado a classe tutor
export class Tutor {
    public id: string;
    public nome: string;
    public data_nasc: string;
    public cpf: string;
    public email: string;
    public telefone: string | undefined;
    public endereco: string | undefined;

// constructor
    constructor(propriedades: TutorInput){
        this.id = propriedades.id
        this.nome = propriedades.nome;
        this.data_nasc = propriedades.data_nasc;
        this.cpf = propriedades.cpf;
        this.email = propriedades.email;
        this.telefone = propriedades.telefone;
        this.endereco = propriedades.endereco;
    }
}