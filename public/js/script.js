// js/script.js

// URL do backend no Render
const API_URL = "https://histomap-backend.onrender.com";

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
document.addEventListener("DOMContentLoaded", () => {

  // Identifica a página atual
  const page = document.body.id;

  // Executa funções conforme a página
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

/* ======================
   FUNÇÕES GLOBAIS
====================== */

// Simulação de login
function usuarioLogado() {
  return localStorage.getItem("usuarioLogado") === "true";
}

function logout() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "index.html";
}

/* ======================
   INDEX.HTML
====================== */

function initIndex() {
  const btnExplorar = document.querySelector(".btn-primary");
  const btnCriarRoteiro = document.querySelector(".btn-secondary");
  const menu = document.querySelector(".menu");

  if (usuarioLogado()) {
    menu.innerHTML = `
      <a href="index.html">Início</a>
      <a href="cidade.html">Cidades</a>
      <a href="roteiro.html">Roteiro</a>
      <a href="#" id="logout">Sair</a>
    `;

    document.getElementById("logout").addEventListener("click", logout);
  }

  btnExplorar?.addEventListener("click", () => {
    window.location.href = "cidade.html";
  });

  btnCriarRoteiro?.addEventListener("click", () => {
    if (!usuarioLogado()) {
      alert("Faça login para criar um roteiro.");
      window.location.href = "login.html";
      return;
    }
    window.location.href = "roteiro.html";
  });
}

/* ======================
   LOGIN.HTML
====================== */

function initLogin() {
  const form = document.querySelector("form");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.setItem("usuarioLogado", "true");
    window.location.href = "index.html";
  });
}

/* ======================
   CADASTRO.HTML
====================== */


function initCadastro() {
  const form = document.getElementById("cadastro-form");
  if (!form) return;

  const nomeInput = document.getElementById("nome");
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    if (!nome || !email || !senha) {
      alert("Preencha todos os campos.");
      return;
    }

    // Simula cadastro
    const usuario = {
      nome,
      email,
      senha // ⚠️ apenas simulação (não fazer isso em produção)
    };

    localStorage.setItem("usuarioCadastrado", JSON.stringify(usuario));

    alert("Cadastro realizado com sucesso! Faça login.");
    window.location.href = "login.html";
  });
}

/* ======================
   CIDADE.HTML
====================== */

async function initCidade() {
  const container = document.getElementById("lista-cidades");
  if (!container) return;

  container.innerHTML = "<p>Carregando cidades...</p>";

  try {
    const response = await fetch("https://histomap-backend.onrender.com/api/cidades");
    const cidades = await response.json();

    container.innerHTML = "";

    cidades.forEach((cidade) => {
      const card = document.createElement("div");
      card.classList.add("cidade-card");

      card.innerHTML = `
        <h3>${cidade.nome} - ${cidade.estado}</h3>
        <p>Caminho: ${cidade.caminho}</p>
        <button>Ver mais</button>
      `;

     card.querySelector("button").addEventListener("click", () => {
  localStorage.setItem("cidadeSelecionada", JSON.stringify(cidade));
  window.location.href = "roteiro.html";
});


      container.appendChild(card);
    });

  } catch (error) {
    container.innerHTML = "<p>Erro ao carregar cidades.</p>";
    console.error(error);
  }
}

function selecionarCidade(cidade) {
  // Salva cidade selecionada (simulação)
  localStorage.setItem("cidadeSelecionada", JSON.stringify(cidade));

  alert(`Cidade selecionada: ${cidade.nome}`);

  // Futuro: redirecionar para detalhes ou roteiro
  // window.location.href = "roteiro.html";
}

/* ======================
   ROTEIRO.HTML
====================== */

async function initRoteiro() {
  const container = document.getElementById("lista-roteiros");
  if (!container) return;

  const cidade = JSON.parse(localStorage.getItem("cidadeSelecionada"));
  if (!cidade || !cidade.id) {
    container.innerHTML = "<p>Cidade não encontrada.</p>";
    return;
  }

  document.getElementById("titulo-roteiro").innerText =
    `Roteiros em ${cidade.nome}`;

  try {
    const response = await fetch(
      `https://histomap-backend.onrender.com/api/roteiros/${cidade.id}`
    );

    if (!response.ok) {
      throw new Error("Erro HTTP " + response.status);
    }

    const roteiros = await response.json();
    container.innerHTML = "";

    if (roteiros.length === 0) {
      container.innerHTML = "<p>Nenhum roteiro disponível.</p>";
      return;
    }

    roteiros.forEach((roteiro) => {
      const card = document.createElement("div");
      card.classList.add("roteiro-card");

      card.innerHTML = `<h3>${roteiro.titulo}</h3>`;
      container.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    container.innerHTML = "<p>Erro ao carregar roteiros.</p>";
  }
}

function renderizarRoteiro(lista, cidades) {
  lista.innerHTML = "";

  cidades.forEach((cidade, index) => {
    const item = document.createElement("li");
    item.textContent = `${index + 1}. ${cidade.nome} - ${cidade.estado}`;
    lista.appendChild(item);
  });
}

/* ======================
   PERFIL.HTML
====================== */

function initPerfil() {
  if (!protegerPagina()) return;

  const nomeUsuario = document.getElementById("nome-usuario");
  const btnLogout = document.getElementById("btn-logout");

  const email = localStorage.getItem("emailUsuario");

  nomeUsuario.textContent = email
    ? `Usuário: ${email}`
    : "Usuário autenticado";

  btnLogout.addEventListener("click", logout);
}

/* ======================
   ATUALIZA MENU
====================== */

function atualizarMenu() {
  const menu = document.querySelector(".menu");
  if (!menu) return;

  if (usuarioLogado()) {
    menu.innerHTML = `
      <a href="index.html">Início</a>
      <a href="cidade.html">Cidades</a>
      <a href="roteiro.html">Roteiro</a>
      <a href="perfil.html">Perfil</a>
      <a href="#" id="logout">Sair</a>
    `;

    document
      .getElementById("logout")
      .addEventListener("click", logout);

  } else {
    menu.innerHTML = `
      <a href="index.html">Início</a>
      <a href="login.html">Login</a>
    `;
  }
}

/* ======================
   PROTEGER PAGINA
====================== */

function protegerPagina() {
  if (!usuarioLogado()) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "login.html";
    return false;
  }
  return true;
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.id === "page-cidade") initCidade();
  if (document.body.id === "page-roteiro") initRoteiro();
});