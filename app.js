// Sistema Biblioteca Online — Versão Final com Empréstimos e Devoluções
const DB = {
  keyAdmins: "lib_admins_v1",
  keyBooks: "lib_books_v1",
  keyUsers: "lib_users_v1",
  keyLoans: "lib_loans_v1",

  load(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

let admins = DB.load(DB.keyAdmins);
let users = DB.load(DB.keyUsers);
let books = DB.load(DB.keyBooks);
let loans = DB.load(DB.keyLoans);
let currentAdmin = null;

const $ = (id) => document.getElementById(id);

// --- Troca entre Login e Cadastro ---
$("btn-show-register").onclick = () => {
  $("login-panel").hidden = true;
  $("register-panel").hidden = false;
};
$("btn-back-login").onclick = () => {
  $("register-panel").hidden = true;
  $("login-panel").hidden = false;
};

// --- Cadastro de Administrador ---
$("register-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("reg-name").value.trim();
  const email = $("reg-email").value.trim();
  const pass = $("reg-pass").value.trim();

  if (!name || !email || !pass) return alert("Preencha todos os campos!");
  if (admins.find((a) => a.email === email)) return alert("Administrador já existe!");

  admins.push({ id: genId(), name, email, pass, role: "admin" });
  DB.save(DB.keyAdmins, admins);

  alert("Administrador cadastrado com sucesso!");
  $("register-form").reset();
  $("register-panel").hidden = true;
  $("login-panel").hidden = false;
});

// --- Login de Administrador ---
$("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("login-name").value.trim();
  const pass = $("login-pass").value.trim();

  const admin = admins.find(
    (a) => a.name.toLowerCase() === name.toLowerCase() && a.pass === pass
  );

  if (!admin) return alert("Nome ou senha incorretos!");

  currentAdmin = admin;
  $("user-area").textContent = `Bem-vindo(a), ${admin.name} — (admin)`;
  $("login-panel").hidden = true;
  $("main-panel").hidden = false;
  renderBooksView();
});

// --- Logout ---
$("btn-logout").onclick = () => {
  currentAdmin = null;
  $("main-panel").hidden = true;
  $("login-panel").hidden = false;
};

// --- Botões principais ---
$("btn-show-books").onclick = renderBooksView;
$("btn-show-users").onclick = renderUsersView;
$("btn-show-loans").onclick = renderLoansView;

// --- Livros ---
function renderBooksView() {
  const content = $("content");
  content.innerHTML = `
    <h3>Gerenciar Livros</h3>
    <input id="search-book" placeholder="Buscar por título, autor ou categoria" class="input-full"/>
    <div class="form-row">
      <input id="bk-title" placeholder="Título">
      <input id="bk-author" placeholder="Autor">
      <input id="bk-cat" placeholder="Categoria">
      <input id="bk-total" type="number" min="1" placeholder="Qtd. total">
      <button id="bk-add" class="btn-primary">Adicionar</button>
    </div>
    <div id="books-table"></div>
  `;
  $("bk-add").onclick = addBook;
  $("search-book").oninput = drawBooksTable;
  drawBooksTable();
}

function addBook() {
  const title = $("bk-title").value.trim();
  const author = $("bk-author").value.trim();
  const category = $("bk-cat").value.trim();
  const total = parseInt($("bk-total").value) || 1;
  if (!title || !author) return alert("Título e autor obrigatórios!");

  books.push({ id: genId(), title, author, category, total, borrowed: 0 });
  DB.save(DB.keyBooks, books);
  drawBooksTable();
  $("bk-title").value = $("bk-author").value = $("bk-cat").value = "";
}

function drawBooksTable() {
  const q = $("search-book").value.toLowerCase();
  const container = $("books-table");
  let html = `<table><thead>
    <tr><th>Título</th><th>Autor</th><th>Categoria</th><th>Qtd</th><th>Disponíveis</th><th>Ações</th></tr>
  </thead><tbody>`;

  books
    .filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
    )
    .forEach((b) => {
      const disponiveis = b.total - (b.borrowed || 0);
      html += `<tr>
        <td>${b.title}</td>
        <td>${b.author}</td>
        <td>${b.category}</td>
        <td>${b.total}</td>
        <td>${disponiveis}</td>
        <td>
          <button onclick="editBook('${b.id}')">Editar</button>
          <button class="btn-danger" onclick="deleteBook('${b.id}')">Excluir</button>
          <button onclick="lendBook('${b.id}')">Emprestar</button>
        </td>
      </tr>`;
    });
  html += "</tbody></table>";
  container.innerHTML = html;
}

function editBook(id) {
  const book = books.find((b) => b.id === id);
  if (!book) return;
  const title = prompt("Novo título:", book.title);
  const author = prompt("Novo autor:", book.author);
  const category = prompt("Nova categoria:", book.category);
  const total = parseInt(prompt("Nova quantidade total:", book.total));
  if (!title || !author || !category || !total) return alert("Campos inválidos.");
  Object.assign(book, { title, author, category, total });
  DB.save(DB.keyBooks, books);
  drawBooksTable();
}

function deleteBook(id) {
  if (!confirm("Deseja excluir este livro?")) return;
  books = books.filter((b) => b.id !== id);
  DB.save(DB.keyBooks, books);
  drawBooksTable();
}

function lendBook(id) {
  const book = books.find((b) => b.id === id);
  if (!book) return;
  const disponiveis = book.total - (book.borrowed || 0);
  if (disponiveis <= 0) return alert("Não há exemplares disponíveis!");

  const userEmail = prompt("E-mail do usuário que irá pegar emprestado:");
  const user = users.find((u) => u.email === userEmail);
  if (!user) return alert("Usuário não encontrado!");

  book.borrowed = (book.borrowed || 0) + 1;
  loans.push({
  id: genId(),
  bookId: book.id, // <-- SALVA O ID
  userEmail,
  bookTitle: book.title,
  date: new Date().toLocaleDateString(),
  returned: false,
  });

  DB.save(DB.keyBooks, books);
  DB.save(DB.keyLoans, loans);
  drawBooksTable();
  alert("Empréstimo registrado com sucesso!");
}

// --- Empréstimos ---
function renderLoansView() {
  const content = $("content");
  content.innerHTML = `
    <h3>Livros Emprestados</h3>
    <div id="loans-table"></div>
  `;
  drawLoansTable();
}

function drawLoansTable() {
  const container = $("loans-table");
  if (loans.length === 0) {
    container.innerHTML = "<p>Nenhum empréstimo registrado.</p>";
    return;
  }

  let html = `<table><thead>
    <tr><th>Usuário</th><th>Livro</th><th>Data</th><th>Status</th><th>Ações</th></tr>
  </thead><tbody>`;

  loans.forEach((l) => {
    html += `<tr>
      <td>${l.userEmail}</td>
      <td>${l.bookTitle}</td>
      <td>${l.date}</td>
      <td>${l.returned ? "Devolvido" : "Emprestado"}</td>
      <td>${
        !l.returned
          ? `<button onclick="returnBook('${l.id}')">Devolver</button>`
          : "-"
      }</td>
    </tr>`;
  });

  html += "</tbody></table>";
  container.innerHTML = html;
}

function returnBook(id) {
  const loan = loans.find((l) => l.id === id);
  if (!loan) return;

  const book = books.find((b) => b.id === loan.bookId); // <-- AGORA VAI FUNCIONAR
  if (book && book.borrowed > 0) book.borrowed--;

  loan.returned = true;

  DB.save(DB.keyLoans, loans);
  DB.save(DB.keyBooks, books);

  alert("Livro devolvido com sucesso!");
  drawLoansTable();
}


// --- Usuários ---
function renderUsersView() {
  const content = $("content");
  content.innerHTML = `
    <h3>Cadastrar Usuários</h3>
    <div class="form-row">
      <input id="u-name" placeholder="Nome">
      <input id="u-email" placeholder="E-mail">
      <select id="u-role">
        <option value="user">Usuário</option>
        <option value="admin">Admin</option>
      </select>
      <button id="u-add" class="btn-primary">Adicionar</button>
    </div>
    <div id="users-table"></div>
  `;
  $("u-add").onclick = addUser;
  drawUsersTable();
}

function addUser() {
  const name = $("u-name").value.trim();
  const email = $("u-email").value.trim();
  const role = $("u-role").value;
  if (!name || !email) return alert("Preencha todos os campos!");
  users.push({ id: genId(), name, email, role });
  DB.save(DB.keyUsers, users);
  drawUsersTable();
  $("u-name").value = $("u-email").value = "";
}

function deleteUser(id) {
  if (!confirm("Deseja excluir este usuário?")) return;
  users = users.filter((u) => u.id !== id);
  DB.save(DB.keyUsers, users);
  drawUsersTable();
}

function drawUsersTable() {
  const container = $("users-table");
  let html =
    "<table><thead><tr><th>Nome</th><th>E-mail</th><th>Tipo</th><th>Ações</th></tr></thead><tbody>";
  users.forEach((u) => {
    html += `<tr>
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td>${u.role}</td>
      <td><button class='btn-danger' onclick="deleteUser('${u.id}')">Excluir</button></td>
    </tr>`;
  });
  html += "</tbody></table>";
  container.innerHTML = html;
}

// --- Util ---
function genId() {
  return "id_" + Math.random().toString(36).slice(2, 9);
}
