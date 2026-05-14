// importando o modelo/propriedades de pet do arquivo pet.models.ts da pasta models
import {Pet} from "../models/pet.models.js";

export class PetRepository {
    // emulando um banco de dados na ram igual o exemplo do professor
    private lista_pets: Pet[] = [];

    //retorna todos os pets cadastrados
    async findALL():Promise<Pet[]>{
        return this.lista_pets;
    }

    //busca um unico pet pelo seu id
    async findByUuid(id: string) : Promise<Pet | undefined> {
        return this.lista_pets.find(pet => pet.id === id);
    }

    //busca todos os pets de um tutor específico
    async findByTutorId(id_tutor: string): Promise<Pet[]> {
        return this.lista_pets.filter(pet => pet.id_tutor === id_tutor);
    }

    // adiciona um novo pet na lista
    async create(pet: Pet): Promise<Pet>{
        this.lista_pets.push(pet);
        return pet;
    }
    // atualiza os dados de um pet existente
    async update(id: string, updateData: Partial<Pet>): Promise<Pet | undefined> {
        const index = this.lista_pets.findIndex(pet => pet.id === id);
        if (index === -1) return undefined;

        this.lista_pets[index] = { ...this.lista_pets[index], ...updateData } as Pet;
        return this.lista_pets[index];
    }

    // remove um pet da lista
    async delete(id: string): Promise<boolean> {
        const initialLeght = this.lista_pets.length;
        
        this.lista_pets = this.lista_pets.filter(pet => pet.id !== id);
        return this.lista_pets.length <initialLeght;
    }
}
