import { z } from "zod";
// importando a funcao para gerar os uuid
import { v4 as uuidv4 } from 'uuid'; 

//definindo dados do pet que irao ser recebidos
// a biblioteca zod ajuda a validar os valores inseridos e retorna mensagem caso nao atenda os requisitos
export const createPetSchema = z.object ({
    id: z.string().uuid({ message: "Formato de ID invalido" }).default(() => uuidv4()),
    nome: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres"}),
    data_nasc: z.string({message: "Data de nascimento invalida" }),
    raca: z.enum(["SRD", "Golden Retriever", "Pug", "Pastor Alemão", "Shitzu"], { message: "Escolha uma raça"}),
    sexo: z.enum(["Macho", "Fêmea"], {message: "Sexo deve ser infomado (Macho ou Fêmea)"}),
    peso: z.coerce.number().positive({ message: "O peso deve ser um número positivo "}), //coerce tenta converter o valor para num antes de validar se é positivo
    porte: z.enum(["Pequeno", "Médio", "Grande"], {message: "Porte inválido"}),
    descricao: z.string().max(500).optional(),
    //Referencia ao ID do tutor
    cpf_tutor: z.string().length(11, { message: "O CPF deve ter exatamente 11 dígitos" }),
    id_tutor: z.string().uuid({ message: "ID do tutor inválido" }).optional()
});

export const updatePetSchema = createPetSchema.partial().omit({id: true, id_tutor: true, cpf_tutor: true});

export type PetInput = z.infer<typeof createPetSchema>;
// de acordo com as propriedades definidas e criado a classe tutor
export class Pet {
   public id: string;
    public nome: string;
    public data_nasc: string;
    public raca: "SRD" | "Golden Retriever" | "Pug"| "Pastor Alemão" | "Shitzu";
    public sexo: "Macho" | "Fêmea";
    public peso: number;
    public porte: "Pequeno" | "Médio" | "Grande";
    public descricao: string | undefined;
    public id_tutor: string;
    public cpf_tutor: string;

// constructor
    constructor(propriedades: PetInput){
        this.id = propriedades.id
        this.nome = propriedades.nome;
        this.data_nasc = propriedades.data_nasc;
        this.raca = propriedades.raca;
        this.sexo = propriedades.sexo;
        this.peso = propriedades.peso;
        this.porte = propriedades.porte;
        this.descricao = propriedades.descricao;
        this.id_tutor = propriedades.id_tutor!;
        this.cpf_tutor = propriedades.cpf_tutor;
    }
}