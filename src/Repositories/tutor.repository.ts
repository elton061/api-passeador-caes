// importando o modelo/propriedades de tutor do arquivo tutor.models.ts da pasta models
import {Tutor} from "../models/tutor.models";

export class TutorRepository {
    // emulando um banco de dados na ram igual o exemplo do professor
    private lista_tutores: Tutor[] = [];

    //retorna os tutores cadastrados
    buscarTodos(){
        return this.lista_tutores
    }

    criar(tutor: Tutor): Tutor{
        this.lista_tutores.push(tutor);

        return tutor;
    }
}
