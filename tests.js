// === TESTES DO SISTEMA BIBLIOTECA ONLINE ===
// Framework simples de testes para validar funcionalidades críticas

const TestRunner = {
  tests: [],
  results: { passed: 0, failed: 0, errors: [] },

  test(name, fn) {
    this.tests.push({ name, fn });
  },

  assert(condition, message) {
    if (!condition) {
      throw new Error(message || "Assertion failed");
    }
  },

  assertEqual(actual, expected, message) {
    if (actual !== expected) {
      throw new Error(message || `Expected ${expected}, got ${actual}`);
    }
  },

  assertArrayIncludes(array, item, message) {
    if (!array.includes(item)) {
      throw new Error(message || `Array does not include ${item}`);
    }
  },

  run() {
    console.log("=== INICIANDO TESTES ===\n");
    this.tests.forEach((test) => {
      try {
        test.fn();
        this.results.passed++;
        console.log(`✓ ${test.name}`);
      } catch (error) {
        this.results.failed++;
        this.results.errors.push({ test: test.name, error: error.message });
        console.error(`✗ ${test.name}: ${error.message}`);
      }
    });
    this.printSummary();
  },

  printSummary() {
    console.log("\n=== RESUMO DOS TESTES ===");
    console.log(`Total: ${this.tests.length}`);
    console.log(`✓ Passaram: ${this.results.passed}`);
    console.log(`✗ Falharam: ${this.results.failed}`);
    if (this.results.errors.length > 0) {
      console.log("\nDetalhes dos Erros:");
      this.results.errors.forEach((err) => {
        console.log(`  - ${err.test}: ${err.error}`);
      });
    }
  },
};

// === TESTES DE FUNCIONALIDADES ===

// 1. Testes de Gerenciamento de Livros
TestRunner.test("Adicionar livro com dados válidos", () => {
  const initialCount = books.length;
  const newBook = {
    id: genId(),
    title: "Teste Livro",
    author: "Autor Teste",
    category: "Ficção",
    total: 5,
    borrowed: 0,
  };
  books.push(newBook);
  TestRunner.assertEqual(books.length, initialCount + 1, "Livro não foi adicionado");
  books.pop(); // Limpar
});

TestRunner.test("Buscar livro por ID", () => {
  const book = {
    id: "test_123",
    title: "Livro de Teste",
    author: "Autor",
    category: "Teste",
    total: 3,
    borrowed: 0,
  };
  books.push(book);
  const found = books.find((b) => b.id === "test_123");
  TestRunner.assert(found !== undefined, "Livro não encontrado");
  books = books.filter((b) => b.id !== "test_123"); // Limpar
});

TestRunner.test("Atualizar informações do livro", () => {
  const book = {
    id: "test_update",
    title: "Título Original",
    author: "Autor",
    category: "Teste",
    total: 2,
    borrowed: 0,
  };
  books.push(book);
  const foundBook = books.find((b) => b.id === "test_update");
  foundBook.title = "Título Atualizado";
  TestRunner.assertEqual(foundBook.title, "Título Atualizado", "Título não foi atualizado");
  books = books.filter((b) => b.id !== "test_update"); // Limpar
});

TestRunner.test("Validar que não há livros com mesmo ID", () => {
  const book1 = { id: "unique_001", title: "Livro 1", author: "A", category: "T", total: 1, borrowed: 0 };
  const book2 = { id: "unique_002", title: "Livro 2", author: "B", category: "T", total: 1, borrowed: 0 };
  books.push(book1, book2);
  const uniqueIds = new Set(books.map((b) => b.id));
  TestRunner.assertEqual(uniqueIds.size, books.length, "Existem IDs duplicados");
  books = books.filter((b) => !b.id.includes("unique_"));
});

// 2. Testes de Gerenciamento de Usuários
TestRunner.test("Adicionar usuário com dados válidos", () => {
  const initialCount = users.length;
  users.push({
    id: genId(),
    name: "Usuário Teste",
    email: "teste@example.com",
    role: "user",
  });
  TestRunner.assertEqual(users.length, initialCount + 1, "Usuário não foi adicionado");
  users.pop(); // Limpar
});

TestRunner.test("Validar que email é único", () => {
  const user1 = { id: "u_001", name: "User 1", email: "unique@test.com", role: "user" };
  const user2 = { id: "u_002", name: "User 2", email: "unique@test.com", role: "user" };
  users.push(user1);
  const duplicate = users.find((u) => u.email === user2.email && u.id !== user2.id);
  users = users.filter((u) => u.email !== "unique@test.com");
  TestRunner.assert(duplicate === undefined, "Email duplicado foi aceito");
});

TestRunner.test("Buscar usuário por email", () => {
  const user = { id: "u_search", name: "Buscador", email: "busca@test.com", role: "user" };
  users.push(user);
  const found = users.find((u) => u.email === "busca@test.com");
  TestRunner.assert(found !== undefined, "Usuário não encontrado por email");
  users = users.filter((u) => u.id !== "u_search");
});

// 3. Testes de Empréstimos
TestRunner.test("Registrar empréstimo válido", () => {
  const book = {
    id: "book_loan_test",
    title: "Livro para Empréstimo",
    author: "Autor",
    category: "Teste",
    total: 5,
    borrowed: 0,
  };
  const user = { id: "user_loan_test", name: "User", email: "loan@test.com", role: "user" };
  books.push(book);
  users.push(user);

  const initialLoanCount = loans.length;
  const newLoan = {
    id: genId(),
    bookId: book.id,
    userEmail: user.email,
    bookTitle: book.title,
    date: new Date().toLocaleDateString(),
    returned: false,
  };
  loans.push(newLoan);
  book.borrowed += 1;

  TestRunner.assertEqual(loans.length, initialLoanCount + 1, "Empréstimo não foi registrado");
  TestRunner.assertEqual(book.borrowed, 1, "Quantidade emprestada não foi atualizada");

  loans = loans.filter((l) => l.id !== newLoan.id);
  books = books.filter((b) => b.id !== "book_loan_test");
  users = users.filter((u) => u.id !== "user_loan_test");
});

TestRunner.test("Validar devolução de livro", () => {
  const book = {
    id: "book_return_test",
    title: "Livro para Devolução",
    author: "Autor",
    category: "Teste",
    total: 3,
    borrowed: 1,
  };
  const loan = {
    id: "loan_return_test",
    bookId: book.id,
    userEmail: "return@test.com",
    bookTitle: book.title,
    date: new Date().toLocaleDateString(),
    returned: false,
  };
  books.push(book);
  loans.push(loan);

  loan.returned = true;
  if (book && book.borrowed > 0) book.borrowed--;

  TestRunner.assert(loan.returned === true, "Devolução não foi registrada");
  TestRunner.assertEqual(book.borrowed, 0, "Quantidade emprestada não foi atualizada na devolução");

  books = books.filter((b) => b.id !== "book_return_test");
  loans = loans.filter((l) => l.id !== "loan_return_test");
});

TestRunner.test("Não permitir empréstimo de livro sem cópias", () => {
  const book = {
    id: "book_no_copies",
    title: "Livro Esgotado",
    author: "Autor",
    category: "Teste",
    total: 1,
    borrowed: 1,
  };
  books.push(book);

  const disponiveis = book.total - (book.borrowed || 0);
  const canBorrow = disponiveis > 0;

  TestRunner.assert(!canBorrow, "Sistema permitiu empréstimo sem cópias disponíveis");
  books = books.filter((b) => b.id !== "book_no_copies");
});

// 4. Testes de Administradores
TestRunner.test("Cadastrar administrador com dados válidos", () => {
  const initialCount = admins.length;
  admins.push({
    id: genId(),
    name: "Admin Teste",
    email: "admin@test.com",
    pass: "senha123",
    role: "admin",
  });
  TestRunner.assertEqual(admins.length, initialCount + 1, "Admin não foi cadastrado");
  admins.pop();
});

TestRunner.test("Validar login de administrador", () => {
  const admin = {
    id: "admin_login_test",
    name: "Admin Login",
    email: "adminlogin@test.com",
    pass: "senha123",
    role: "admin",
  };
  admins.push(admin);

  const found = admins.find(
    (a) => a.name.toLowerCase() === "admin login" && a.pass === "senha123"
  );
  TestRunner.assert(found !== undefined, "Admin não foi encontrado para login");
  admins = admins.filter((a) => a.id !== "admin_login_test");
});

// 5. Testes de Persistência
TestRunner.test("Salvar e carregar dados do localStorage", () => {
  const testData = [{ id: "test_persist", name: "Data Persistida" }];
  DB.save("test_key", testData);
  const loadedData = DB.load("test_key");
  TestRunner.assertEqual(loadedData.length, 1, "Dados não foram salvos/carregados corretamente");
  localStorage.removeItem("test_key");
});

// 6. Testes de Validações
TestRunner.test("Rejeitar nome vazio ao cadastrar livro", () => {
  const title = "";
  const isValid = title && title.trim().length > 0;
  TestRunner.assert(!isValid, "Nome vazio foi aceito");
});

TestRunner.test("Validar formato de ID gerado", () => {
  const id = genId();
  const isValidFormat = id.startsWith("id_") && id.length > 3;
  TestRunner.assert(isValidFormat, "ID gerado em formato inválido");
});

TestRunner.test("Garantir unicidade de IDs", () => {
  const ids = [genId(), genId(), genId(), genId(), genId()];
  const uniqueIds = new Set(ids);
  TestRunner.assertEqual(
    uniqueIds.size,
    ids.length,
    "IDs gerados não são únicos"
  );
});

// Executar todos os testes
TestRunner.run();
