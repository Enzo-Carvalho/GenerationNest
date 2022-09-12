import { IsNotEmpty, Max, MaxLength } from "class-validator";
import { Tarefa } from "src/tarefa/entities/tarefa.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity('tb_categoria')
export class Categoria{
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(500)
    @Column({nullable: false, length:500})
    descricao: string

    @OneToMany(()=> Tarefa, (tarefa)=> tarefa.categoria)
    tarefas: Tarefa[]
}