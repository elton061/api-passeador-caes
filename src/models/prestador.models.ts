import { z } from "zod";
// importando a funcao para gerar os uuid
import { v4 as uuidv4 } from 'uuid'; 

// definindo dados do prestador que irao ser recebidos
// a biblioteca zod ajuda a validar os valores inseridos e retorna mensagem caso nao atenda os requisitos
export const createPrestadorSchema = z.object({
    id: z.string().uuid({ message: "Formato de ID invalido" }).default(() => uuidv4()),
    nome: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres"}),
    especialidade: z.string().min(2, { message: "A especialidade é obrigatória" }),
    cpf_cnpj: z.string().min(11).max(14, { message: "O CPF/CNPJ deve ter entre 11 e 14 dígitos" }),
    email: z.string().email({ message: "Endereco de e-mail invalido"}),
    telefone: z.string().optional(),
    endereco: z.string().optional(),
});

export const updatePrestadorSchema = createPrestadorSchema.partial().omit({id: true});

export type PrestadorInput = z.infer<typeof createPrestadorSchema>;

// de acordo com as propriedades definidas e criado a classe prestador
export class Prestador {
    public id: string;
    public nome: string;
    public especialidade: string;
    public cpf_cnpj: string;
    public email: string;
    public telefone: string | undefined;
    public endereco: string | undefined;

    // constructor
    constructor(propriedades: PrestadorInput){
        this.id = propriedades.id
        this.nome = propriedades.nome;
        this.especialidade = propriedades.especialidade;
        this.cpf_cnpj = propriedades.cpf_cnpj;
        this.email = propriedades.email;
        this.telefone = propriedades.telefone;
        this.endereco = propriedades.endereco;
    }
}