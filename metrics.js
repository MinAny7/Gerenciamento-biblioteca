// === SISTEMA DE MÉTRICAS E COLETA DE DADOS ===
// Monitora uso do sistema e permite análise de performance

const MetricsCollector = {
  metricsKey: "lib_metrics_v1",
  
  metrics: {
    sessionStart: null,
    sessionDuration: 0,
    loginAttempts: 0,
    successfulLogins: 0,
    failedLogins: 0,
    booksAdded: 0,
    booksEdited: 0,
    booksDeleted: 0,
    usersAdded: 0,
    usersDeleted: 0,
    loansCreated: 0,
    loansReturned: 0,
    searchQueries: 0,
    averageSessionDuration: 0,
    peakUsageHour: null,
    actionsPerSession: 0,
    lastActivityTime: null,
    systemLoadTime: null,
    userSatisfactionRating: 0,
  },

  sessionsHistory: [],

  init() {
    this.metrics.sessionStart = Date.now();
    this.loadMetrics();
    this.trackSessionStart();
    console.log("✓ Sistema de Métricas Inicializado");
  },

  loadMetrics() {
    const stored = localStorage.getItem(this.metricsKey);
    if (stored) {
      const data = JSON.parse(stored);
      this.metrics = { ...this.metrics, ...data.metrics };
      this.sessionsHistory = data.sessionsHistory || [];
    }
  },

  saveMetrics() {
    localStorage.setItem(
      this.metricsKey,
      JSON.stringify({
        metrics: this.metrics,
        sessionsHistory: this.sessionsHistory,
      })
    );
  },

  recordLogin(success = true) {
    this.metrics.loginAttempts++;
    if (success) {
      this.metrics.successfulLogins++;
    } else {
      this.metrics.failedLogins++;
    }
    this.metrics.lastActivityTime = new Date().toLocaleString();
    this.saveMetrics();
  },

  recordBookAction(action) {
    switch (action) {
      case "add":
        this.metrics.booksAdded++;
        break;
      case "edit":
        this.metrics.booksEdited++;
        break;
      case "delete":
        this.metrics.booksDeleted++;
        break;
    }
    this.metrics.actionsPerSession++;
    this.metrics.lastActivityTime = new Date().toLocaleString();
    this.saveMetrics();
  },

  recordUserAction(action) {
    if (action === "add") this.metrics.usersAdded++;
    if (action === "delete") this.metrics.usersDeleted++;
    this.metrics.actionsPerSession++;
    this.metrics.lastActivityTime = new Date().toLocaleString();
    this.saveMetrics();
  },

  recordLoanAction(action) {
    if (action === "create") this.metrics.loansCreated++;
    if (action === "return") this.metrics.loansReturned++;
    this.metrics.actionsPerSession++;
    this.metrics.lastActivityTime = new Date().toLocaleString();
    this.saveMetrics();
  },

  recordSearch() {
    this.metrics.searchQueries++;
    this.metrics.actionsPerSession++;
    this.metrics.lastActivityTime = new Date().toLocaleString();
    this.saveMetrics();
  },

  trackSessionStart() {
    this.metrics.sessionStart = Date.now();
    this.metrics.actionsPerSession = 0;
  },

  trackSessionEnd() {
    if (this.metrics.sessionStart) {
      const duration = Math.round((Date.now() - this.metrics.sessionStart) / 1000);
      this.metrics.sessionDuration = duration;

      this.sessionsHistory.push({
        timestamp: new Date().toLocaleString(),
        duration: duration,
        actions: this.metrics.actionsPerSession,
        logins: this.metrics.successfulLogins,
      });

      // Manter histórico dos últimos 100 dias
      if (this.sessionsHistory.length > 100) {
        this.sessionsHistory.shift();
      }

      this.calculateAverageSessionDuration();
      this.saveMetrics();
    }
  },

  calculateAverageSessionDuration() {
    if (this.sessionsHistory.length === 0) return;
    const total = this.sessionsHistory.reduce((sum, s) => sum + s.duration, 0);
    this.metrics.averageSessionDuration = Math.round(total / this.sessionsHistory.length);
  },

  recordUserRating(rating) {
    if (rating >= 1 && rating <= 5) {
      this.metrics.userSatisfactionRating = rating;
      this.metrics.lastActivityTime = new Date().toLocaleString();
      this.saveMetrics();
    }
  },

  getMetricsReport() {
    return {
      titulo: "Relatório de Métricas do Sistema",
      geradoEm: new Date().toLocaleString(),
      metricas: {
        "Login e Autenticação": {
          "Tentativas de Login": this.metrics.loginAttempts,
          "Logins Bem-Sucedidos": this.metrics.successfulLogins,
          "Logins Falhados": this.metrics.failedLogins,
          "Taxa de Sucesso": this.getTaxaSucesso(),
        },
        "Gerenciamento de Livros": {
          "Livros Adicionados": this.metrics.booksAdded,
          "Livros Editados": this.metrics.booksEdited,
          "Livros Deletados": this.metrics.booksDeleted,
          "Total de Operações": this.metrics.booksAdded + this.metrics.booksEdited + this.metrics.booksDeleted,
        },
        "Gerenciamento de Usuários": {
          "Usuários Adicionados": this.metrics.usersAdded,
          "Usuários Deletados": this.metrics.usersDeleted,
        },
        "Sistema de Empréstimos": {
          "Empréstimos Criados": this.metrics.loansCreated,
          "Devoluções Realizadas": this.metrics.loansReturned,
          "Taxa de Devolução": this.getTaxaDevolucao(),
        },
        "Uso do Sistema": {
          "Buscas Realizadas": this.metrics.searchQueries,
          "Ações por Sessão": this.metrics.actionsPerSession,
          "Duração Média da Sessão (segundos)": this.metrics.averageSessionDuration,
          "Duração da Sessão Atual (segundos)": this.metrics.sessionDuration,
          "Última Atividade": this.metrics.lastActivityTime,
        },
        "Satisfação do Usuário": {
          "Avaliação (1-5)": this.metrics.userSatisfactionRating || "Não avaliado",
        },
      },
    };
  },

  getTaxaSucesso() {
    if (this.metrics.loginAttempts === 0) return "0%";
    const taxa = (
      (this.metrics.successfulLogins / this.metrics.loginAttempts) *
      100
    ).toFixed(2);
    return taxa + "%";
  },

  getTaxaDevolucao() {
    if (this.metrics.loansCreated === 0) return "0%";
    const taxa = (
      (this.metrics.loansReturned / this.metrics.loansCreated) *
      100
    ).toFixed(2);
    return taxa + "%";
  },

  displayMetricsReport() {
    const report = this.getMetricsReport();
    console.clear();
    console.log("╔" + "═".repeat(50) + "╗");
    console.log("║" + " ".repeat(50) + "║");
    console.log("║" + "  RELATÓRIO DE MÉTRICAS - BIBLIOTECA ONLINE".padEnd(49) + "║");
    console.log("║" + " ".repeat(50) + "║");
    console.log("╚" + "═".repeat(50) + "╝");
    console.log(`\nGerado em: ${report.geradoEm}\n`);

    Object.entries(report.metricas).forEach(([categoria, dados]) => {
      console.log(`📊 ${categoria}`);
      console.log("-".repeat(50));
      Object.entries(dados).forEach(([chave, valor]) => {
        console.log(`  ${chave}: ${valor}`);
      });
      console.log("");
    });

    return report;
  },

  exportMetricsAsJSON() {
    const report = this.getMetricsReport();
    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `metricas_biblioteca_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    console.log("✓ Métricas exportadas como JSON");
  },

  exportMetricsAsCSV() {
    const report = this.getMetricsReport();
    let csv = "Categoria,Métrica,Valor\n";

    Object.entries(report.metricas).forEach(([categoria, dados]) => {
      Object.entries(dados).forEach(([chave, valor]) => {
        csv += `"${categoria}","${chave}","${valor}"\n`;
      });
    });

    const dataBlob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `metricas_biblioteca_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    console.log("✓ Métricas exportadas como CSV");
  },
};

// Inicializar sistema de métricas quando a página carregar
window.addEventListener("load", () => {
  MetricsCollector.init();
});

// Rastrear fim de sessão
window.addEventListener("beforeunload", () => {
  MetricsCollector.trackSessionEnd();
});

// Integração com o sistema existente
// Descomente para ativar:

/*
// Hook no login
const originalLoginHandler = $('login-form').onsubmit;
$('login-form').addEventListener('submit', (e) => {
  MetricsCollector.recordLogin(true);
});

// Hook em ações de livros
window.addBookHook = () => {
  MetricsCollector.recordBookAction('add');
};

window.editBookHook = () => {
  MetricsCollector.recordBookAction('edit');
};

window.deleteBookHook = () => {
  MetricsCollector.recordBookAction('delete');
};

// Hook em buscas
const searchBookInput = $('search-book');
if (searchBookInput) {
  const originalInput = searchBookInput.oninput;
  searchBookInput.oninput = () => {
    MetricsCollector.recordSearch();
    if (originalInput) originalInput();
  };
}
*/
