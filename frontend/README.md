

=======


### PLAINTETX
Front-End/
├── public/
│   ├── index.html           // Página principal (ou home), servindo como "hub" da aplicação
│   ├── attendant.html       // Página do atendente (para criação e exclusão de reservas)
│   ├── waiter.html          // Página do garçom (para confirmação de reservas utilizadas)
│   ├── manager.html         // Página do gerente (para geração de relatórios)
│   └── assets/
│       ├── css/
│       │   └── styles.css         // Seu CSS customizado para ajustes e sobreposições
│       ├── js/
│       │   ├── main.js            // JavaScript para funcionalidades gerais e manipulação do DOM
│       │   ├── reservationApi.js  // Funções para comunicação com o back-end relativas às reservas
│       │   └── reportApi.js       // Funções para requisição de relatórios
│       └── images/                // Imagens, ícones e outros recursos visuais
├── README.md                    	 // Documentação e instruções do projeto
└── package.json                  // Para gerenciamento de dependências e scripts










### 1. O dia a dia da empresa: Como o sistema deve ajudar
Imagine o seguinte fluxo de trabalho em um restaurante:

- *Um cliente liga ou chega ao restaurante e quer reservar uma mesa.*  
  → O *atendente* precisa de uma tela intuitiva para criar a reserva, preenchendo os campos obrigatórios (como data, horário, mesa e número de pessoas). Após registrar, o sistema informa se a operação foi bem-sucedida ou se houve algum erro.  

- *Chega o horário da reserva e o cliente utiliza a mesa.*  
  → O *garçom*, ao perceber que a mesa reservada foi utilizada, marca a reserva como concluída no sistema. Isso libera a mesa para novas reservas futuras. Aqui, o sistema deve mudar automaticamente o status da mesa para "reservável" e dar um feedback visual claro sobre o sucesso ou erro da ação.  

- *O gerente quer entender o fluxo de reservas e otimizar o atendimento.*  
  → Ele acessa relatórios detalhados para verificar quantas reservas foram atendidas, quais mesas foram mais utilizadas e até quantos pedidos foram confirmados por cada garçom. Caso não haja dados suficientes, o sistema informa que nenhum relatório relevante pode ser gerado.  

 ###Lista de coisas a adaptar 
 - * Rodapé