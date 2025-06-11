========================================================================================================================
# Bem-vindo ao Sistema de Reservas - 404 Café!

## Estrutura do Back-End

Abaixo está a estrutura do back-end do projeto, organizada para facilitar o desenvolvimento e a manutenção:

```
src/
├── app.ts                                                  # Arquivo principal para inicialização da aplicação.
├── env.ts                                                  # Gerenciamento de variáveis de ambiente.
├── server.ts                                               # Configuração e inicialização do servidor.
├── Datenbank                                               # Pasta com a criação do banco
│   └── config.ts                                           # Criação do banco de dados
├── entities/                                               # Definição de entidades e modelos de domínio.
│   ├── Garcon.ts                                           # Criação dos Garçons
│   ├── Mesas.ts                                            # Criação das Mesas
│   └── Reservas.ts                                         # Criação das Reservas
├── http/                                                   # Camada HTTP da aplicação.
│   ├── controllers/                                        # Controladores responsáveis por lidar com requisições.
│   │   ├── AtualizarStatusReservaController.ts             # Controller de Atualizar o Status da reserva
│   │   ├── BuscarGarconsController.ts                      # Controller de Buscar Garçons
│   │   ├── BuscarMesasController.ts                        # Controller de Buscar Mesas
│   │   ├── BuscarReservasController.ts                     # Controller de Buscar Reservas
│   │   ├── CriarRelatorioReservasPorGarcomController.ts    # Controller de Criar Relatorio por Garçom
│   │   ├── CriarRelatorioReservasPorMesaController.ts      # Controller de Criar Relatorio por Mesa                                
│   │   ├── CriarRelatorioReservasPorPeriodoController.ts   # Controller de Criar Relatorio por Reservar
│   └── └── CriarReservaCoontoller                          # Controller de Criar Reserva
├── repositories/                                           # Implementações de repositórios para acesso a dados.
│   ├── GarconRepository.ts                                 # Repositorio de Garçom
│   ├── MesaRepository.ts                                   # Repositorio de Mesa
│   ├── ReservaRepository.ts                                # Repositorio de Reserva
│   ├── sqlite/                                             # Repositorio a partir do SQLite
│   │   ├── SqliteGarconRepository.ts                       # Repositorio a partir do SQLite para Garçom
│   │   ├── SqliteMesaRepository.ts                         # Repositorio a partir do SQLite para Mesa
│   └── └── SqliteReservaRepository.ts                      # Repositorio a partir do SQLite para Reserva
├── routes/                                                 # Pasta de rotas
│   ├── garcons.routes.ts                                   # Rotas de Garçom
│   ├── gerente.routes.ts                                   # Rotas de Gerente
│   ├── mesas.routes.ts                                     # Rotas de Mesa
│   └── reservas.routes.ts                                  # Rotas de Reservas
├── useCases/                                               # Pasta de UseCase
│   ├── AtualizarStatusReservaUseCase.ts                    # UseCase para Atualizar Status
│   ├── BuscarGarconsUseCase.ts                             # UseCase para Buscar Garçom
│   ├── BuscarMesasUseCase.ts                               # UseCase para Buscar Mesa
│   ├── BuscarReservasUseCase.ts                            # UseCase para Buscar Reserva
│   ├── CriarRelatorioReservasPorGarcomUseCase.ts           # UseCase para Criar Relatorio Reserva por Garçom
│   ├── CriarRelatorioReservasPorMesaUseCase.ts             # UseCase para Criar Relatorio Reserva por Mesa
│   ├── CriarRelatorioReservasPorPeriodoUsecase.ts          # UseCase para Criar Relatorio Reserva por Periodo
│   ├── CriarReservaUseCase.ts                              # UseCase para Criar Relatorio
│   ├── erros/                                              # Pasta de erro
│   │   ├── BuscarGarcomError.ts                            # Erro personalizado para Buscar Garçom
│   │   ├── BuscarMesasError.ts                             # Erro personalizado para Buscar Mesa
│   │   ├── BuscarReservasError.ts                          # Erro personalizado para Buscar Reserv
│   │   ├── ReservaExistsError.ts                           # Erro personalizado para Reserva Existente
│   │   ├── ReservaInexistenteError.ts                      # Erro personalizado para Reserva Inexistente
│   │   ├── validateDataError.ts                            # Erro personalizado para Validação de Data
│   │   ├── validateHoraError.ts                            # Erro personalizado para Validação de Hora
│   │   ├── validateMesaError.ts                            # Erro personalizado para Validação de Mesa
│   │   ├── validateNomeError.ts                            # Erro personalizado para Validação de Nome
│   │   └── validateQuantidadePessoasError.ts               # Erro personalizado para Validação de Quantidade de Pessoas
|   ├── factories/                                          # Pasta de factories
│   │   ├── makeAtulizarStatusReservaUseCase.ts             # Factories UseCase Make Atulizar Status Reserva
│   │   ├── makeBuscarGarconsUseCase.ts                     # Factories UseCase Make Buscar Garçom
│   │   ├── makeBuscarMesasUseCase.ts                       # Factories UseCase Make Buscar Mesa
│   │   ├── makeBuscarReservasUseCase.ts                    # Factories UseCase Make Buscar Reservas
│   │   ├── makeCriarRelatorioReservasPorGarcomUseCase.ts   # Factories UseCase Make Criar Relatorio Reserva por Garçom
│   │   ├── makeCriarRelatorioReservasPorMesaUseCase.ts     # Factories UseCase Make Criar Relatorio Reserva por Mesa
│   │   ├── makeCriarRelatorioReservasPorPeriodoUseCase.ts  # Factories UseCase Make Criar Relatorio Reserva por Periodo
│   └── └── makeCriarReservaUseCase.ts                      # Factories UseCase Make Criar Relatorio Reserva
├── utils/                                                  # Pasta de Utils
|   ├── checkRouteExists.ts                                 # Checar Rotas
|   ├── generateDatabasePath.ts                             # Criar Arquivo DataBase
|   ├── isGarcom.ts                                         # Conferir se o type que vem do Front tá certo
|   ├── isMesa.ts                                           # Conferir se o type que vem do Front tá certo
└── └── isReserva.ts                                        # Conferir se o type que vem do Front tá certo
```

========================================================================================================================

## Descrição do Projeto

O Sistema de Reservas - 404 Café é uma aplicação web voltada para o gerenciamento de reservas e atendimento em restaurantes.  
O sistema possui:
- **Atendente:** Responsável pelo cadastro e cancelamento de reservas.
- **Garçom:** Atua na confirmação de reservas pendentes.
- **Gerente:** Gera relatórios que auxiliam na análise de desempenho e na eficiência operacional (Por período, garçom e mesa).
- Integração com API para comunicação e persistência dos dados.


## Arquivo de Pastas
A organização de pastas está totalmente moldada para todos os aquivos ficarem separados e organizados para, caso haja, uma possível manutenção fique mais fácil.
