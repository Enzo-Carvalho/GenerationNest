import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes do Módulo de Tarefa (e2e)', () => {
  let app: INestApplication;

  let tarefaId: number

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '12345qwert',
          database: 'db_todolist_test',
          autoLoadEntities: true,
          synchronize: true,
          logging: false,
          dropSchema: true
      }),
      AppModule
    ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('01 - teste para inserir uma Tarefa no banco', async() => {
    let response = await request(app.getHttpServer())
    .post('/tarefa')
    .send({
      nome: '1 Tarefa test',
      descricao: 'Testando adicionamento de tarefa',
      responsavel: 'Eu',
      data: '2022-09-15',
      status: true
    })
    .expect(201)
    tarefaId = response.body.id
  })


  it('02 - teste para deletar uma tarefa do banco', async() =>{
    return request(app.getHttpServer())
    .delete('/tarefa/' + tarefaId)
    .expect(204)
  })

  it('03 - Teste para não atualizar uma tarefa que não existe', async() => {
    return request(app.getHttpServer())
    .put('/tarefa')
    .send({
      id: 1,
      nome: 'Atualizar tarefa',
      descricao: 'Atualizando tarefa inexistente',
      responsavel: 'Eu',
      data: '2022-09-15',
      status: false
    })
    .expect(404)
  })


  afterAll(async () => {
    await app.close()
  })

});
