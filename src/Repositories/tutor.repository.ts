// importando o modelo/propriedades de tutor do arquivo tutor.models.ts da pasta models
import {Tutor} from "../models/tutor.models.js";

export class TutorRepository {
    // emulando um banco de dados na ram igual o exemplo do professor
    private lista_tutores: Tutor[] = [];

    //retorna os tutores cadastrados
    async findALL():Promise<Tutor[]>{
        return this.lista_tutores;
    }

    //busca um unico tutor pelo seu id
    async findByUuid(id: string) : Promise<Tutor | undefined> {
        return this.lista_tutores.find(tutor => tutor.id === id);
    }

    // adiciona um novo tutor na lista
    async create(tutor: Tutor): Promise<Tutor>{
        this.lista_tutores.push(tutor);
        return tutor;
    }
    // atualiza os dados de um tutor existente
    async update(id: string, updateData: Partial<Tutor>): Promise<Tutor | undefined> {
        const index = this.lista_tutores.findIndex(tutor => tutor.id === id);
        if (index === -1) return undefined;

        this.lista_tutores[index] = { ...this.lista_tutores[index], ...updateData } as Tutor;
        return this.lista_tutores[index];
    }

    // remove um tutor da lista
    async delete(id: string): Promise<boolean> {
        const initialLeght = this.lista_tutores.length;
        
        this.lista_tutores = this.lista_tutores.filter(tutor => tutor.id !== id);
        return this.lista_tutores.length <initialLeght;
    }
}
