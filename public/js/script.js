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

// ================= LOGIN SIMULADO =================
function usuarioLogado() {
  return localStorage.getItem("usuarioLogado") === "true";
}

function logout() {
  localStorage.removeItem("usuarioLogado");
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

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.setItem("usuarioLogado", "true");
    window.location.href = "index.html";
  });
}

// ================= CADASTRO =================
function initCadastro() {
  const form = document.getElementById("cadastro-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Cadastro simulado!");
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
    const res = await fetch(`${API_URL}/api/roteiros/${cidade.id}`);
    if (!res.ok) throw new Error("HTTP " + res.status);

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
  if (!usuarioLogado()) {
    alert("Faça login");
    return (window.location.href = "login.html");
  }
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
