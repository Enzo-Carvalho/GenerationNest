import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaController } from './categoria/controllers/categoria.controller';
import { Categoria } from './categoria/entities/categoria.entity';
import { CategoriaModule } from './categoria/module/categoria.module';
import { CategoriaService } from './categoria/services/categoria.service';
import { ProdutoController } from './produtos/controllers/produto.controller';
import { Produto } from './produtos/entities/produto.entity';
import { ProdutoModule } from './produtos/modules/produto.module';
import { ProdutoService } from './produtos/service/produto.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'db_farmacia',
    entities: [Produto, Categoria],
    synchronize: true
  }), 
  ProdutoModule,
  CategoriaModule
  ],
  controllers: [ProdutoController, CategoriaController],
  providers: [ProdutoService, CategoriaService],
})
export class AppModule {}
