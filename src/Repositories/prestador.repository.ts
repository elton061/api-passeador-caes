// importando o modelo/propriedades de prestador do arquivo prestador.models.ts da pasta models
import { Prestador } from "../models/prestador.models.js";

export class PrestadorRepository {
    // emulando um banco de dados na ram igual o exemplo do professor
    private lista_prestadores: Prestador[] = [];

    // retorna os prestadores cadastrados
    async findALL(): Promise<Prestador[]> {
        return this.lista_prestadores;
    }

    // busca um unico prestador pelo seu id
    async findByUuid(id: string): Promise<Prestador | undefined> {
        return this.lista_prestadores.find(prestador => prestador.id === id);
    }

    // adiciona um novo prestador na lista
    async create(prestador: Prestador): Promise<Prestador> {
        this.lista_prestadores.push(prestador);
        return prestador;
    }

    // atualiza os dados de um prestador existente
    async update(id: string, updateData: Partial<Prestador>): Promise<Prestador | undefined> {
        const index = this.lista_prestadores.findIndex(prestador => prestador.id === id);
        if (index === -1) return undefined;

        this.lista_prestadores[index] = { ...this.lista_prestadores[index], ...updateData } as Prestador;
        return this.lista_prestadores[index];
    }

    // remove um prestador da lista
    async delete(id: string): Promise<boolean> {
        const initialLength = this.lista_prestadores.length;
        
        this.lista_prestadores = this.lista_prestadores.filter(prestador => prestador.id !== id);
        return this.lista_prestadores.length < initialLength;
    }
}