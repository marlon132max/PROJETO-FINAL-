// ================= CONFIG =================
const API_URL = "https://histomap-backend.onrender.com";

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  atualizarMenu();

  const page = document.body.id;

  switch (page) {
    case "page-index":
      initIndex();
      break;
    case "page-login":
      initLogin();
      break;
    case "page-cadastro":
      initCadastro();
      break;
    case "page-cidade":
      initCidade();
      break;
    case "page-roteiro":
      initRoteiro();
      break;
    case "page-perfil":
      initPerfil();
      break;
  }
});

// ================= AUTH =================
function setUsuario(usuario) {
  localStorage.setItem("usuario", JSON.stringify(usuario));
}

function getUsuario() {
  const u = localStorage.getItem("usuario");
  if (!u || u === "undefined") return null;

  try {
    return JSON.parse(u);
  } catch {
    return null;
  }
}

function usuarioLogado() {
  const u = getUsuario();
  return !!u && !!u.id;
}

function logout() {
  localStorage.removeItem("usuario");
  window.location.href = "index.html";
}

// ================= INDEX =================
function initIndex() {
  const btnExplorar = document.querySelector(".btn-primary");
  const btnCriarRoteiro = document.querySelector(".btn-secondary");

  btnExplorar?.addEventListener("click", () => {
    window.location.href = "cidade.html";
  });

  btnCriarRoteiro?.addEventListener("click", () => {
    if (!usuarioLogado()) {
      alert("Faça login primeiro");
      return (window.location.href = "login.html");
    }
    window.location.href = "roteiro.html";
  });
}

// ================= LOGIN =================
function initLogin() {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.querySelector('input[type="email"]').value;
    const senha = form.querySelector('input[type="password"]').value;

    const res = await fetch(`${API_URL}/api/usuario/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Erro no login");
      return;
    }

    // ✅ CORREÇÃO À PROVA DE ERRO
    setUsuario(data.usuario || data);

    window.location.href = "index.html";
  });
}

// ================= CADASTRO =================
function initCadastro() {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputs = form.querySelectorAll("input");
    const nome = inputs[0].value;
    const email = inputs[1].value;
    const senha = inputs[2].value;

    const res = await fetch(`${API_URL}/api/usuario/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Erro no cadastro");
      return;
    }

    alert("Cadastro realizado! Faça login.");
    window.location.href = "login.html";
  });
}

// ================= CIDADES =================
async function initCidade() {
  const container = document.getElementById("lista-cidades");
  if (!container) return;

  container.innerHTML = "Carregando cidades...";

  try {
    const res = await fetch(`${API_URL}/api/cidades`);
    const cidades = await res.json();

    container.innerHTML = "";

    cidades.forEach((cidade) => {
      const card = document.createElement("div");
      card.classList.add("cidade-card");

      card.innerHTML = `
        <h3>${cidade.nome} - ${cidade.estado}</h3>
        <button>Selecionar</button>
      `;

      card.querySelector("button").onclick = () => {
        localStorage.setItem("cidadeSelecionada", JSON.stringify(cidade));
        window.location.href = "roteiro.html";
      };

      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = "Erro ao carregar cidades.";
  }
}

// ================= ROTEIROS =================
async function initRoteiro() {
  const container = document.getElementById("lista-roteiros");
  if (!container) return;

  const cidade = JSON.parse(localStorage.getItem("cidadeSelecionada"));

  if (!cidade) {
    container.innerHTML = "Selecione uma cidade primeiro.";
    return;
  }

  document.getElementById("titulo-roteiro").innerText = `Roteiros em ${cidade.nome}`;

  try {
    const res = await fetch(`${API_URL}/api/roteiros?cidade_id=${cidade.id}`);
    const roteiros = await res.json();

    container.innerHTML = "";

    if (!roteiros.length) {
      container.innerHTML = "Nenhum roteiro encontrado.";
      return;
    }

    roteiros.forEach((r) => {
      const div = document.createElement("div");
      div.classList.add("roteiro-card");
      div.innerHTML = `<h3>${r.titulo}</h3>`;
      container.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = "Erro ao carregar roteiros.";
  }
}

// ================= PERFIL =================
function initPerfil() {
  const user = getUsuario();

  if (!user) {
    alert("Faça login");
    return (window.location.href = "login.html");
  }

  const nome = document.getElementById("nome-usuario");
  if (nome) nome.innerText = user.nome;

  document.getElementById("btn-logout")?.addEventListener("click", logout);
}

// ================= MENU =================
function atualizarMenu() {
  const menu = document.querySelector(".menu");
  if (!menu) return;

  if (usuarioLogado()) {
    menu.innerHTML = `
      <a href="index.html">Início</a>
      <a href="cidade.html">Cidades</a>
      <a href="roteiro.html">Roteiros</a>
      <a href="perfil.html">Perfil</a>
      <a href="#" id="logout">Sair</a>
    `;
    document.getElementById("logout").onclick = logout;
  } else {
    menu.innerHTML = `
      <a href="index.html">Início</a>
      <a href="login.html">Login</a>
    `;
  }
}