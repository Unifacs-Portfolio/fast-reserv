========================================================================================================================
# Bem-vindo ao Sistema de Reservas - 404 Café!

Front-End/
├── public/
│    ├── assets/
│    |    ├── css/
│    |    │   └── styles.css          # Estilos gerais e customizados
|    |    └── images/
│    |        ├── icons               # favicon utilizado 
│    |        └── banners             # Banner utilizado
|    | 
│    ├── js/              
|    |    ├── api.js                  # Scripts com as chamadas à API
│    │    ├── atendente.js            # Funcionalidades e tratamento de erros para o atendente
│    │    ├── garcom.js               # Funcionalidades e tratamento de erros para o garçom
│    │    ├── gerente.js              # Funcionalidades e tratamento de erros para o gerente
|    |    └── utils.js                # Arquivo util
|    |
│    ├── index.html                   # Hub principal da aplicação (responsável por orquestrar a navegação)
│    ├── attendant.html               # Interface do painel do atendente
│    ├── waiter.html                  # Interface do painel do garçom
│    └── manager.html                 # Interface do painel do gerente
|
├── README.md                         # Documentação completa do projeto
├── node_modules                        
└── package.json                      # Gerenciamento de dependências e scripts
 
========================================================================================================================

## Descrição do Projeto

O Sistema de Reservas - 404 Café é uma aplicação web voltada para o gerenciamento de reservas e atendimento em restaurantes.  
O sistema possui:
- **Atendente:** Responsável pelo cadastro e cancelamento de reservas.
- **Garçom:** Atua na confirmação de reservas pendentes.
- **Gerente:** Gera relatórios que auxiliam na análise de desempenho e na eficiência operacional (Por período, garçom e mesa).
- Integração com API para comunicação e persistência dos dados.


## Fluxo de Trabalho
Imagine o seguinte fluxo de trabalho em um restaurante:

1. **Cadastro de Reserva (Painel do Atendente):**
   - O atendente realiza o cadastro da reserva preenchendo os campos obrigatórios e escolhendo uma mesa entre as opções fixas.
   - Ao registrar, a reserva é armazenada com o status `pendente`.

2. **Confirmação da Reserva (Painel do Garçom):**
   - O garçom visualiza as reservas com status `pendente` e, após selecionar seu nome dentre as opções fixas, confirma a reserva, que é então atualizada para o status `confirmada`.

3. **Geração de Relatórios (Painel do Gerente):**
   - O gerente pode gerar relatórios por período, por garçom ou por mesa para analisar os atendimentos e as reservas realizadas.
   - Os relatórios ajudam a identificar o desempenho e a eficiência operacional do restaurante.

A aplicação será iniciada no servidor local (geralmente em http://localhost:80) e o hub (index.html) permitirá navegar entre os diferentes painéis.


## Tecnologias Utilizadas

- **HTML5** e **CSS3**: Estrutura e estilização da interface.
- **JavaScript (ES6+)**: Manipulação do DOM, validações e comunicação com a API.
- **Bootstrap 5.1.3**: Responsividade e componentes visuais.
- **LocalStorage**: Simulação de persistência de dados para ambiente de prototipagem.