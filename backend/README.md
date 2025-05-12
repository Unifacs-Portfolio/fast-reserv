# Estrutura do Projeto

Este projeto segue uma estrutura organizada para facilitar o desenvolvimento, manutenção e escalabilidade. Abaixo está uma descrição detalhada de cada diretório e arquivo:

## Arquivos de Configuração

- **.env**: Arquivo para armazenar variáveis de ambiente, como credenciais e configurações sensíveis.
- **.gitignore**: Lista de arquivos e pastas que devem ser ignorados pelo Git.
- **.npmrc**: Configurações específicas para o gerenciador de pacotes npm.
- **biome.json**: Configuração do Biome, uma ferramenta de lint e formatação de código.
- **docker-compose.yml**: Configuração para orquestração de containers Docker.
- **package.json**: Arquivo de configuração do Node.js, contendo dependências, scripts e metadados do projeto.
- **tsconfig.json**: Configuração do TypeScript, incluindo opções de compilação.
- **vitest.config.ts**: Configuração para testes utilizando o framework Vitest.

## Diretórios

### build/
Contém os arquivos gerados após o processo de build, prontos para serem utilizados em produção.

### src/
Diretório principal do código-fonte do projeto. Está organizado da seguinte forma:

- **app.ts**: Arquivo principal para inicialização da aplicação.
- **env.ts**: Gerenciamento de variáveis de ambiente.
- **server.ts**: Configuração e inicialização do servidor.

#### entities/
Definição de entidades e modelos de domínio da aplicação.

#### http/
Camada HTTP da aplicação, responsável por lidar com requisições e respostas.

- **controllers/**: Controladores que gerenciam a lógica de entrada e saída de dados.
- **middlewares/**: Middlewares para processamento intermediário de requisições.

#### repositories/
Implementações de repositórios para acesso a dados.

- **memory/**: Repositórios em memória, úteis para testes e desenvolvimento local.
- **sqlite/**: Repositórios baseados no banco de dados SQLite.

#### useCases/
Implementação dos casos de uso da aplicação, que representam as regras de negócio.

- **errors/**: Definição de erros específicos dos casos de uso.
- **factories/**: Fábricas para criação de instâncias de casos de uso.

# Estrutura do Back-End

Abaixo está a estrutura do back-end do projeto, organizada para facilitar o desenvolvimento e a manutenção:

```plaintext
src/
├── app.ts               # Arquivo principal para inicialização da aplicação.
├── env.ts               # Gerenciamento de variáveis de ambiente.
├── server.ts            # Configuração e inicialização do servidor.
├── entities/            # Definição de entidades e modelos de domínio.
├── http/                # Camada HTTP da aplicação.
│   ├── controllers/     # Controladores responsáveis por lidar com requisições.
│   ├── middlewares/     # Middlewares para processamento de requisições.
├── repositories/        # Implementações de repositórios para acesso a dados.
│   ├── memory/          # Repositórios em memória (úteis para testes).
│   ├── sqlite/          # Repositórios baseados no SQLite.
├── useCases/            # Casos de uso da aplicação.
│   ├── errors/          # Definição de erros específicos dos casos de uso.
│   ├── factories/       # Fábricas para criação de instâncias de casos de uso.
```

### Descrição dos Diretórios

- **app.ts**: Arquivo principal que inicializa a aplicação e configura os módulos principais.
- **env.ts**: Gerencia as variáveis de ambiente, garantindo segurança e flexibilidade.
- **server.ts**: Configura e inicia o servidor HTTP.

#### entities/
Contém as definições das entidades do domínio, que representam os objetos principais da aplicação.

#### http/
Camada responsável por lidar com as requisições HTTP:
- **controllers/**: Implementa a lógica para processar  as requisições e enviar respostas.
- **middlewares/**: Contém funções intermediárias para validação, autenticação, etc.

#### repositories/
Implementa o acesso a dados:
- **memory/**: Repositórios em memória, úteis para testes e desenvolvimento local.
- **sqlite/**: Repositórios que utilizam o banco de dados SQLite.

#### useCases/
Implementa as regras de negócio da aplicação:
- **errors/**: Define erros específicos para os casos de uso.
- **factories/**: Cria instâncias de casos de uso e seus componentes relacionados.
