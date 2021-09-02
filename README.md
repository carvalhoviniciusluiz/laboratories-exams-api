<h1 align="center">
  ## Laboratories#Exams
</h1>

<blockquote align="center">“Com grandes poderes vem grandes responsabilidades”!</blockquote>

<p align="center">
  <img alt="challenge" src="https://img.shields.io/badge/challenge-%2304D361">

  <a href="https://github.com/carvalhoviniciusluiz">
    <img alt="Made by Vinicius Carvalho" src="https://img.shields.io/badge/made%20by-Vinicius%20Carvalho-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">
</p>

<p align="center">
  <a href="#objetivo">Objetivo</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#loop-test-api">Test API</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

<p align="center">
  <a href="https://insomnia.rest/run/?label=Laboratories-Exams&uri=https%3A%2F%2Fgithub.com%2Fcarvalhoviniciusluiz%2Flaboratories-exams-api%2Fblob%2Fmain%2F.insomnia%2FInsomnia_2021-09-02.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

## Objetivo:
- Construir uma API para manutenção de laboratórios e exames.
## Contexto
Estamos desenvolvendo uma aplicação para as seguintes situações:
- Laboratório:
  - cadastrar um novo laboratório;
  - obter uma lista de laboratórios ativos;
  - atualizar um laboratório existente;
  - remover logicamente um laboratório ativo.
- Exames:
  - cadastrar um novo exame;
  - obter uma lista de exames ativos;
  - atualizar um exame existente;
  - remover logicamente um exame ativo.
- Associação:
  - associar um exame ativo à um laboratório ativo;
  - desassociar um exame ativo de um laboratório ativo;
  **Importante:**
  - Um exame pode estar associado a mais de um laboratório;
  - O cadastro de um laboratório/exame é considerado ativo e recebe um `id` gerado automaticamente.

### Informações
- Laboratório
  - nome
  - endereço
  - status [ativo, inativo]
- Exame
  - nome
  - tipo [analise clinica, imagem]
  - status [ativo, inativo]
## Funcionalidades extras
- Possibilidade de executar cadastro, atualização e remoção em lote;
- Endpoint que faz a busca por nome do exame e retorna todos os laboratórios associados a esse exame.
## Requisitos técnicos
- Desenvolver usando *Javascript*
- Serviço deve respeitar os princípios RESTFul
- Criar um `README.md` (arquitetura, instruções de uso, entre outros)
## Diferenciais
- Publicação do ambiente em um serviço cloud de hospedagens (Heroku, AWS, GCP, etc)
- Configurar a aplicação para rodar em um container
- Documentação da API

## :rocket: Sobre o projeto

### **Requisitos:**

- [NodeJs ``>14.0.0``](https://nodejs.org/en/).

- [Docker Descktop](https://docs.docker.com/desktop/mac/install/)

- [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

### **As ferramentas que você irá encontrar**

Aplicação criada do zero usando [NestJs](https://nestjs.com/), conta com as seguintes ferramentas:

- Husky + Concurrently;
- ESLint + Prettier + EditorConfig;
- [TypeORM](https://typeorm.io/#/) [(PostgreSQL)](https://www.postgresql.org/);
- [Restful](https://www.redhat.com/pt-br/topics/api/what-is-a-rest-api);
- [Swagger](https://swagger.io/) + [Insomnia](https://insomnia.rest/);
- [Jest](https://jestjs.io/);
- Tests de TDD + e2e;
- Outros

__NOTA__: Todo o projeto está baseado na [arquitetura de modulos sugerida pelo Nestjs](https://docs.nestjs.com/modules)

### **Instalação:**
```
yarn
```

### **Tests:**
```shell
yarn test && yarn test:e2e
```

### **Rodando o Projeto:**
Este projeto está conteinerizado em Docker, com exceção do nodejs, você não precisa ter instalado localmente o banco de dados integrado ao sistema.

Para subir o docker do projeto rode:
```bash
docker-compose up
```

__NOTA__: o projeto conta com todas as configurações realizadas a partir de variáveis ambiente. Você deve criar um arquivo ``.env`` a partir do ``.env.sample`` já existente no projeto.

## :loop: Test API

Este projeto possui sua api documentada com [swagger](https://swagger.io/) bastanto para tal acessar a rota [``http://localhost:3333/api/``](http://localhost:3333/api/)

![Sem Título](https://user-images.githubusercontent.com/22005684/131832218-f6a112c8-c498-4a3b-bc8b-eee344996e39.png)


Alternativamente, você pode usar a ferramenta de test de apis [Insomnia](https://insomnia.rest/) e importar o arquivo existente na pasta ``.insomnia`` para dentro da ferramenta onde ela fornecesserá todo o acesso necessário as apis do projeto. Também é possível usar o botão [``Run in Insomnia``](https://insomnia.rest/run/?label=Laboratories-Exams&uri=https%3A%2F%2Fgithub.com%2Fcarvalhoviniciusluiz%2Flaboratories-exams-api%2Fblob%2Fmain%2F.insomnia%2FInsomnia_2021-09-02.json) que está presente no topo desta documentação, ou clicando neste link, para agilizar a importação.

![Sem Título](https://user-images.githubusercontent.com/22005684/131832565-54cbc51e-be23-4ac7-a370-2197afd1daff.png)

__NOTA__: O projeto conta com um ambiente de produção hospedado no [Heroku](https://www.heroku.com/) acessível através [``http://laboratories-exams-api.herokuapp.com``](http://laboratories-exams-api.herokuapp.com) ou alterando o ambiente configurado no Insomnia:

![Sem Título](https://user-images.githubusercontent.com/22005684/131923633-42bf5ca5-251e-4d27-9941-9958e9b064bd.png)

__IMPORTANTE__: Por padrão as apps instaladas para test stage no ambiente Heroku hibernam após certo período de tempo. Caso o testo do projeto esteja sendo realizado no ambiente Heroku pela primeira vez deve-se aguardar 30s para que o Heroku possa subir a instancia de teste.

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
