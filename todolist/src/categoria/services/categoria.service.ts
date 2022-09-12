import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";

@Injectable()
export class CategoriaService{
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ){}

    async create(categoria: Categoria): Promise<Categoria>{
        return this.categoriaRepository.save(categoria)
    }

    async findAll(): Promise<Categoria[]>{
        return this.categoriaRepository.find({
            relations: {
                tarefas: true
            }
        })
    }

    async findById(id: number): Promise<Categoria>{
        let categoriaProcurada = await this.categoriaRepository.findOne({
            where: {
                id
            },
            relations:{
                tarefas: true
            }
        })
        if(!categoriaProcurada){
            throw new HttpException('Nenhuma categoria foi encontrada com esse id', HttpStatus.NOT_FOUND)
        }
        return categoriaProcurada
    }

    async findByNome(nome: string): Promise<Categoria[]> {
        return this.categoriaRepository.find({
            where: {
                descricao: ILike(`%${nome}%`)
            },
            relations:{
                tarefas: true
            }
        })
    }

    async delete(id: number): Promise<DeleteResult>{
        let categoriaDeletar = this.findById(id)
        if(!categoriaDeletar){
            throw new HttpException('Nenhum id encontrado', HttpStatus.NOT_FOUND)
        }
        return this.categoriaRepository.delete(id)
    }

    async update(categoria: Categoria): Promise<Categoria> {
        let categoriaUpdate = this.findById(categoria.id)
        if(!categoriaUpdate || !categoria.id){
            throw new HttpException('Nenhuma categoria encontrada', HttpStatus.NOT_FOUND)
        }
        return this.categoriaRepository.save(categoria)
    }
}