import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { DeleteResult} from "typeorm";
import { Categoria } from "../entities/categoria.entity";
import { CategoriaService } from "../services/categoria.service";

@Controller('/categoria')
export class CategoriaController{
    constructor(
        private readonly service: CategoriaService
    ){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() categoria: Categoria): Promise<Categoria>{
        return this.service.create(categoria)
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]>{
        return this.service.findAll()
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe)id: number): Promise<Categoria>{
        return this.service.findById(id)
    }

    @Get('/busca/:nome')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome')nome: string): Promise<Categoria[]> {
        return this.service.findByNome(nome)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe)id: number): Promise<DeleteResult>{
        return this.service.delete(id)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body()categoria: Categoria): Promise<Categoria>{
        return this.service.update(categoria)
    }

}