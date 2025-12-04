# 📚 Sistema Biblioteca Online

Um sistema completo de gerenciamento de biblioteca desenvolvido em JavaScript puro (Vanilla JS), permitindo o controle de livros, usuários e empréstimos de forma intuitiva e eficiente.

**Versão Atual:** v1.0.0 | **Status:** Production | **Data:** Dezembro 2025

---

## 📖 Documentação Completa

Veja o arquivo [`DOCUMENTACAO.md`](./DOCUMENTACAO.md) para acesso centralizado a toda a documentação do projeto, incluindo:

- 🎯 **[PMBOK_ANALISE.md](./PMBOK_ANALISE.md)** - Análise dos princípios PMBOK aplicados
- 👥 **[STAKEHOLDERS.md](./STAKEHOLDERS.md)** - Mapeamento de stakeholders
- 🛠️ **[METODOLOGIA.md](./METODOLOGIA.md)** - Metodologia Scrum + XP
- 📅 **[CRONOGRAMA.md](./CRONOGRAMA.md)** - Timeline e manutenção (até Jan 2026)
- 🚀 **[ROADMAP.md](./ROADMAP.md)** - Visão de longo prazo (até Jun 2027)
- 📊 **[METRICAS.md](./METRICAS.md)** - Métricas de qualidade e satisfação

---

## 📋 Funcionalidades

### 👨‍💼 Administração
- **Login/Cadastro de Administradores**: Sistema seguro de autenticação
- **Dashboard Administrativo**: Interface centralizada para todas as operações

### 📚 Gerenciamento de Livros
- **Adicionar Livros**: Cadastro com título, autor, categoria e quantidade total
- **Editar Livros**: Modificação de informações existentes
- **Excluir Livros**: Remoção de títulos do catálogo
- **Busca Inteligente**: Filtragem por título, autor ou categoria
- **Controle de Estoque**: Acompanhamento de exemplares disponíveis

### 👥 Gerenciamento de Usuários
- **Cadastro de Usuários**: Adição de leitores comuns ou administradores
- **Listagem Completa**: Visualização de todos os usuários cadastrados
- **Exclusão de Usuários**: Remoção de usuários do sistema

### 📖 Sistema de Empréstimos
- **Empréstimo de Livros**: Registro de retirada com validação de disponibilidade
- **Devolução de Livros**: Controle de devoluções e atualização automática do estoque
- **Histórico Completo**: Registro detalhado de todos os empréstimos
- **Status em Tempo Real**: Acompanhamento do status (emprestado/devolvido)

## 🚀 Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Persistência**: LocalStorage (dados salvos localmente no navegador)
- **Design**: Interface responsiva com design moderno
- **Animações**: Transições suaves com CSS

## 🧪 Testes e Métricas

### Executar Testes Automatizados
```bash
# Abra o arquivo tests.js no console do navegador
# Cole no console: 
# TestRunner.run();

# Resultado esperado: 13 testes automatizados cobrindo:
# ✓ CRUD de Livros
# ✓ CRUD de Usuários
# ✓ Sistema de Empréstimos
# ✓ Autenticação de Admin
# ✓ Persistência em localStorage
# ✓ Validações de entrada
```

### Ver Métricas de Uso
```bash
# No console do navegador:
# MetricsCollector.displayMetricsReport();

# Ou exportar dados:
# MetricsCollector.exportMetricsAsJSON();
# MetricsCollector.exportMetricsAsCSV();
```

---

## 📊 Qualidade do Projeto

### Cobertura de Testes
- **v1.0:** 80% ✅
- **Meta:** 90% (v1.2)

### Satisfação (NPS)
- **Dezembro/25:** 13 (Beta)
- **Janeiro/26:** 26+ (Esperado)
- **Meta:** 75+ (v2.2)

### Performance
- **Tempo médio:** 300ms
- **Meta:** 150ms (v2.0)

### Bugs Críticos
- **v1.0:** 0 críticos ✅
- **Total v1.0:** 9 bugs corrigidos

Para detalhes completos: [`METRICAS.md`](./METRICAS.md)

---

## 🛠️ Como Executar o Projeto

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Não requer instalação de dependências ou servidor

### Passos para execução:

1. **Clone ou baixe o projeto**
   ```bash
   git clone <url-do-repositorio>
   cd gerenciamento-biblioteca
   ```

2. **Abra o arquivo principal**
   - Abra o arquivo `index.html` diretamente no seu navegador
   - Ou utilize um servidor local (recomendado para desenvolvimento)

3. **Primeiro acesso**
   - Clique em "Cadastrar Administrador" para criar o primeiro admin
   - Preencha os campos: Nome, E-mail e Senha
   - Faça login com as credenciais criadas

## 📖 Como Usar

### 1. Gerenciamento de Livros
- Acesse a aba "Livros"
- Use o campo de busca para filtrar títulos
- Clique em "Adicionar" para cadastrar novos livros
- Use os botões "Editar" e "Excluir" para modificar/remover livros
- Clique em "Emprestar" para registrar empréstimos

### 2. Gerenciamento de Usuários
- Acesse a aba "Usuários"
- Preencha os campos e clique em "Adicionar"
- Visualize a lista completa de usuários cadastrados

### 3. Controle de Empréstimos
- Acesse a aba "Livros Emprestados"
- Visualize todos os empréstimos ativos
- Clique em "Devolver" para registrar devoluções

## 💾 Persistência de Dados

O sistema utiliza LocalStorage do navegador para armazenar todos os dados:
- Administradores cadastrados
- Catálogo de livros
- Lista de usuários
- Histórico de empréstimos

**⚠️ Importante**: Os dados são armazenados localmente no navegador. Limpar o cache ou usar modo de navegação anônima irá apagar todos os dados.

## 🎨 Características Técnicas

- **Interface Responsiva**: Adapta-se a diferentes tamanhos de tela
- **Design Moderno**: Paleta de cores roxa com elementos visuais elegantes
- **Experiência Fluida**: Animações e transições suaves
- **Validações Robustas**: Controle de entrada de dados
- **Código Limpo**: Estrutura organizada e bem comentada

## 📝 Notas de Desenvolvimento

Este é um projeto acadêmico/protótipo que demonstra conceitos fundamentais de desenvolvimento web:
- Manipulação do DOM
- Gerenciamento de estado
- Persistência local
- Interface usuário responsiva
- Programação orientada a eventos

### v1.x - Fundação (Dez 25 - Fev 26)
- MVP estável com funcionalidades principais
- Testes 80%+ cobertura
- Documentação completa

### v2.x - Expansão (Mar 26 - Mai 26)
- App Mobile (React Native)
- APIs RESTful
- Sistema de recomendações (IA básica)
- Monetização (Freemium)

### v3.x - Integração (Jun 26 - Nov 26)
- Integrações externas (Google Books API)
- Conteúdo digital (PDF/EPUB)
- Multitenância (SaaS)
- Conformidade LGPD/GDPR

### v4.x - Inovação (Dez 26 - Jun 27)
- Chatbot com IA
- Gamification
- Realidade Aumentada (AR)
- Social features

**Investimento Total Estimado:** R$ 115.000 (18 meses)

Ver roadmap detalhado: [`ROADMAP.md`](./ROADMAP.md)

---

## 🔐 Segurança e Conformidade

### v1.0 Implementado
- ✅ Validação de entrada
- ✅ LocalStorage com dados locais
- ✅ Testes de segurança básicos

### Próximas Versões
- [ ] Hash de senhas (bcrypt) - v1.1
- [ ] Autenticação OAuth2 - v2.0
- [ ] Criptografia em repouso - v3.6
- [ ] OWASP Top 10 compliance - v3.6
- [ ] ISO 27001 candidato - v3.7

---

## 🤝 Contribuição

Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Escreva testes para sua feature (veja `tests.js`)
4. Commit suas mudanças com mensagem descritiva
5. Abra um Pull Request com descrição clara

**Requisitos para PR:**
- ✅ Mínimo 80% cobertura de testes
- ✅ Code review de pelo menos 1 pessoa
- ✅ Documentação atualizada
- ✅ Sem conflitos de merge

---

## 📞 Suporte e Contato

**Período de Manutenção:** 1º de dezembro de 2025 - 31 de janeiro de 2026

- 🔴 **Crítico:** Resposta em 1h
- 🟠 **Alto:** Resposta em 4h
- 🟡 **Médio:** Resposta em 1 dia
- 🟢 **Baixo:** Resposta em 3 dias

---

## 📄 Licença

Este projeto é de uso acadêmico e pode ser utilizado livremente para fins de aprendizado e demonstração.

---

## 📚 Referências Acadêmicas

- PMBOK Guide (Project Management Body of Knowledge)
- Scrum Framework
- XP (Extreme Programming) - Kent Beck
- Clean Code - Robert C. Martin
- Software Testing Best Practices

---

**Última Atualização:** 4 de dezembro de 2025  
**Mantido por:** Equipe de Desenvolvimento  
**Status:** ✅ v1.0 em Produção

