import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { DeleteResult} from "typeorm";
import { Tarefa } from "../entities/tarefa.entity";
import { TarefaService } from "../services/tarefa.service";

@Controller('/tarefa')
export class TarefaController{
    constructor(
        private readonly service: TarefaService
    ){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() tarefa: Tarefa): Promise<Tarefa>{
        return this.service.create(tarefa)
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Tarefa[]>{
        return this.service.findAll()
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe)id: number): Promise<Tarefa>{
        return this.service.findById(id)
    }

    @Get('/busca/:nome')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome')nome: string): Promise<Tarefa[]> {
        return this.service.findByNome(nome)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe)id: number): Promise<DeleteResult>{
        return this.service.delete(id)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body()tarefa: Tarefa): Promise<Tarefa>{
        return this.service.update(tarefa)
    }


}