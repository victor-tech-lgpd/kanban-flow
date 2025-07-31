<h1 class="text-3xl mb-6">KanbanFlow: Uma Aplicação Kanban Moderna com React</h1>
  <p class="mb-4">KanbanFlow é uma aplicação web de quadro Kanban rica em funcionalidades, inspirada no Trello. Construída com uma stack de tecnologias modernas, este projeto demonstra o domínio de interfaces de usuário complexas, gerenciamento de estado avançado e as melhores práticas de desenvolvimento frontend.</p>

  <h2 class="text-2xl mt-8 mb-4">✨ Funcionalidades Principais</h2>
  <ul class="list-disc pl-6 mb-6">
    <li><strong>Gerenciamento Completo (CRUD):</strong> Crie, leia, atualize e exclua quadros, colunas e tarefas.</li>
    <li><strong>Modal de Edição:</strong> Clique em uma tarefa para abrir um modal com detalhes e opções de edição.</li>
    <li><strong>Arrastar e Soltar (Drag and Drop) Avançado:</strong>
      <ul class="list-circle pl-6">
        <li>Reordene tarefas dentro da mesma coluna.</li>
        <li>Mova tarefas entre colunas diferentes.</li>
        <li>Reordene colunas inteiras no quadro.</li>
      </ul>
    </li>
    <li><strong>Persistência de Dados:</strong> Todas as alterações são salvas e recuperadas de uma API mock.</li>
  </ul>

  <h2 class="text-2xl mt-8 mb-4">🚀 Stack de Tecnologias e Decisões Arquitetônicas</h2>
  <p class="mb-4">Cada tecnologia neste projeto foi escolhida deliberadamente para demonstrar autonomia, conhecimento das tendências da indústria e um foco em performance e escalabilidade.</p>
  <table>
    <thead>
      <tr>
        <th>Tecnologia</th>
        <th>Utilização</th>
        <th>Justificativa da Escolha</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>React & TypeScript</td>
        <td>Framework Principal</td>
        <td>Base da aplicação, atendendo aos requisitos da vaga e garantindo um código robusto, escalável e com tipagem segura.</td>
      </tr>
      <tr>
        <td>dnd-kit</td>
        <td>Arrastar e Soltar</td>
        <td>Escolhido como a solução moderna e performática para interações de arrastar e soltar. Ao contrário de bibliotecas mais antigas e sem manutenção, o dnd-kit é um "toolkit" leve, acessível e altamente personalizável, que oferece controle total sobre a experiência do usuário, ideal para interfaces complexas.</td>
      </tr>
      <tr>
        <td>React Query & Zustand</td>
        <td>Gerenciamento de Estado</td>
        <td>Implementação de uma arquitetura de estado sofisticada que separa o estado do servidor do estado da UI. React Query gerencia todo o ciclo de vida dos dados da API (fetching, caching, revalidação), enquanto Zustand cuida do estado global leve da UI (como o estado de um modal), demonstrando uma compreensão avançada dos padrões modernos de gerenciamento de estado.</td>
      </tr>
      <tr>
        <td>Tailwind CSS</td>
        <td>Estilização</td>
        <td>Utilizado com uma abordagem "component-first". Em vez de classes longas no JSX, os estilos são encapsulados em componentes de UI reutilizáveis. O uso de utilitários como clsx e tailwind-merge permite a criação de um sistema de design coeso e de fácil manutenção.</td>
      </tr>
      <tr>
        <td>json-server</td>
        <td>Mock API</td>
        <td>Uma escolha pragmática para simular um backend RESTful completo com zero configuração. Permite demonstrar todas as habilidades de consumo de API (GET, POST, PUT, DELETE) e a definição de um contrato de API claro, mantendo o foco no desenvolvimento frontend.</td>
      </tr>
      <tr>
        <td>Vercel</td>
        <td>Implantação</td>
        <td>Plataforma de implantação com zero configuração para aplicações React. A integração com o GitHub permite um fluxo de CI/CD contínuo, fornecendo uma URL de demonstração ao vivo e demonstrando familiaridade com práticas modernas de DevOps.</td>
      </tr>
    </tbody>
  </table>

  <h2 class="text-2xl mt-8 mb-4">⚙️ Como Executar o Projeto Localmente</h2>
  <p class="mb-4">Siga os passos abaixo para configurar e rodar o projeto em sua máquina.</p>
  <h3 class="text-xl mt-6 mb-2">Pré-requisitos</h3>
  <ul class="list-disc pl-6 mb-4">
    <li>Node.js (versão 18 ou superior)</li>
    <li>npm ou yarn</li>
  </ul>

  <h3 class="text-xl mt-6 mb-2">Instalação</h3>
  <ol class="list-decimal pl-6 mb-4">
    <li>Clone o repositório:
      <pre><code>git clone https://github.com/victor-tech-lgpd/kanban-flow.git
cd kanban-flow</code></pre>
    </li>
    <li>Instale as dependências do projeto:
      <pre><code>npm install</code></pre>
    </li>
  </ol>

  <h3 class="text-xl mt-6 mb-2">Execução</h3>
  <ol class="list-decimal pl-6 mb-4">
    <li>Inicie a API mock: Em um terminal, execute o comando abaixo para iniciar o json-server. Ele servirá os dados do arquivo <code>db.json</code> na porta 3001.
      <pre><code>npm run api</code></pre>
      <p>Você verá uma mensagem indicando que o servidor está rodando e listando os recursos disponíveis.</p>
    </li>
    <li>Inicie a aplicação React: Em um segundo terminal, inicie o servidor de desenvolvimento do Vite.
      <pre><code>npm run dev</code></pre>
    </li>
    <li>Abra no navegador: Abra <a href="http://localhost:5173">http://localhost:5173</a> (ou a porta indicada no terminal) para ver a aplicação em funcionamento.</li>
  </ol>

  <h2 class="text-2xl mt-8 mb-4">📄 Contrato da API (Endpoints)</h2>
  <p class="mb-4">A colaboração eficaz com equipes de backend começa com a definição de um contrato de API claro. Abaixo estão os endpoints simulados pelo json-server para este projeto.</p>
  <table>
    <thead>
      <tr>
        <th>Método</th>
        <th>Caminho (Path)</th>
        <th>Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>GET</td>
        <td>/boards</td>
        <td>Retorna uma lista de todos os quadros.</td>
      </tr>
      <tr>
        <td>GET</td>
        <td>/columns</td>
        <td>Retorna todas as colunas.</td>
      </tr>
      <tr>
        <td>GET</td>
        <td>/tasks</td>
        <td>Retorna todas as tarefas.</td>
      </tr>
      <tr>
        <td>POST</td>
        <td>/columns</td>
        <td>Cria uma nova coluna.</td>
      </tr>
      <tr>
        <td>PUT</td>
        <td>/columns/:id</td>
        <td>Atualiza uma coluna existente.</td>
      </tr>
      <tr>
        <td>DELETE</td>
        <td>/columns/:id</td>
        <td>Exclui uma coluna.</td>
      </tr>
      <tr>
        <td>POST</td>
        <td>/tasks</td>
        <td>Cria uma nova tarefa.</td>
      </tr>
      <tr>
        <td>PUT</td>
        <td>/tasks/:id</td>
        <td>Atualiza uma tarefa existente.</td>
      </tr>
      <tr>
        <td>DELETE</td>
        <td>/tasks/:id</td>
        <td>Exclui uma tarefa.</td>
      </tr>
    </tbody>
  </table>
