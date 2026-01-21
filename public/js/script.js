// js/script.js

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
  const form = document.querySelector("form");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";
  });
}

/* ======================
   CIDADE.HTML
====================== */

function initCidade() {
  console.log("Página de cidades carregada");
  // Aqui depois entra mapa / lista de cidades
}

/* ======================
   ROTEIRO.HTML
====================== */

function initRoteiro() {
  if (!usuarioLogado()) {
    alert("Acesso restrito. Faça login.");
    window.location.href = "login.html";
    return;
  }

  console.log("Página de roteiro carregada");
}

/* ======================
   PERFIL.HTML
====================== */

function initPerfil() {

  // Protege a página
  if (!usuarioLogado()) {
    alert("Você precisa estar logado para acessar o perfil.");
    window.location.href = "login.html";
    return;
  }

  const nomeUsuario = document.getElementById("nome-usuario");
  const btnLogout = document.getElementById("btn-logout");

  // Recupera dados simulados
  const email = localStorage.getItem("emailUsuario");

  // Exibe informações
  nomeUsuario.textContent = email 
    ? `Usuário: ${email}` 
    : "Usuário autenticado";

  // Logout
  btnLogout.addEventListener("click", () => {
    logout();
  });
}