========================================================================================================================

Front-End/
├── public/
│   ├── index.html           // Página principal (hub da aplicação)
│   ├── attendant.html       // Página do atendente: criação e cancelamento de reservas 
│   ├── waiter.html          // Página do garçom: confirmação de reservas
│   ├── manager.html         // Página do gerente: geração de relatórios 
│   └── assets/
│       ├── css/
│       │   └── styles.css   // CSS customizado para ajustes e sobreposições
│       ├── js/
│       │   ├── main.js            // JavaScript para funcionalidades gerais e manipulação do DOM      (?)
│       │   ├── reservationApi.js  // Funções para comunicação com o back-end relativas às reservas    (?)
│       │   └── reportApi.js       // Funções para requisição de relatórios                            (?)
│       └── images/                // Imagens e ícones  (ex.: cafezinhobanner.gif, faviconcoffe.jpg)
├── README.md                // Documentação e instruções do projeto
└── package.json             // Gerenciamento de dependências e scripts

========================================================================================================================

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

## Tecnologias Utilizadas

- **HTML5** e **CSS3**: Estrutura e estilização da interface.
- **JavaScript (ES6+)**: Manipulação do DOM, validações e comunicação com a API.
- **Bootstrap 5.1.3**: Responsividade e componentes visuais.
- **LocalStorage**: Simulação de persistência para ambiente de prototipagem.