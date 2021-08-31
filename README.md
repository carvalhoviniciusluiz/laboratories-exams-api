
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
