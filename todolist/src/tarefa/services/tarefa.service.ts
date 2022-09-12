import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Tarefa } from "../entities/tarefa.entity";

@Injectable()
export class TarefaService{
    constructor(@InjectRepository(Tarefa)
        private tarefaRepository: Repository<Tarefa>
    ){}

    async create(tarefa: Tarefa): Promise<Tarefa>{
        return this.tarefaRepository.save(tarefa)
    }

    async findAll(): Promise<Tarefa[]>{
        return this.tarefaRepository.find({
            relations:{
                categoria: true
            }
        })

    }

    async findById(id: number): Promise<Tarefa>{
        let tarefaProcurada = await this.tarefaRepository.findOne({
            where: {
                id
            },
            relations: {
                categoria: true
            }

        })
        if(!tarefaProcurada){
            throw new HttpException('Nenhuma tarefa foi encontrada com esse id', HttpStatus.NOT_FOUND)
        }
        return tarefaProcurada
    }

    async findByNome(nome: string): Promise<Tarefa[]> {
        return this.tarefaRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations:{
                categoria: true
            }
        })
    }

    async delete(id: number): Promise<DeleteResult>{
        let tarefaDeletar = this.findById(id)
        if(!tarefaDeletar){
            throw new HttpException('Nenhum id encontrado', HttpStatus.NOT_FOUND)
        }
        return this.tarefaRepository.delete(id)
    }

    async update(tarefa: Tarefa): Promise<Tarefa> {
        let tarefaUpdate = this.findById(tarefa.id)
        if(!tarefaUpdate || !tarefa.id){
            throw new HttpException('Nenhuma tarefa encontrada', HttpStatus.NOT_FOUND)
        }
        return this.tarefaRepository.save(tarefa)
    }
    
 }