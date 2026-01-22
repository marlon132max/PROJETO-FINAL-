const API_URL = "https://histomap-backend.onrender.com";

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  atualizarMenu();

  const page = document.body.id;

  switch (page) {
    case "page-login":
      initLogin();
      break;
    case "page-cadastro":
      initCadastro();
      break;
    case "page-perfil":
      initPerfil();
      break;
    case "page-cidade":
      initCidade();
      break;
    case "page-roteiro":
      initRoteiro();
      break;
  }
});

// ================= AUTH =================
function getUsuario() {
  return JSON.parse(localStorage.getItem("usuario"));
}

function logout() {
  localStorage.removeItem("usuario");
  window.location.href = "index.html";
}

// ================= LOGIN =================
function initLogin() {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.querySelector("input[type=email]").value;
    const senha = form.querySelector("input[type=password]").value;

    const res = await fetch(`${API_URL}/api/usuario/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    localStorage.setItem("usuario", JSON.stringify(data));
    window.location.href = "index.html";
  });
}

// ================= CADASTRO =================
function initCadastro() {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = form.querySelector("input[type=text]").value;
    const email = form.querySelector("input[type=email]").value;
    const senha = form.querySelector("input[type=password]").value;

    const res = await fetch(`${API_URL}/api/usuario/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";
  });
}

// ================= PERFIL =================
async function initPerfil() {
  const usuario = getUsuario();

  if (!usuario) {
    alert("Faça login");
    return (window.location.href = "login.html");
  }

  const res = await fetch(`${API_URL}/api/usuario/${usuario.id}`);
  const data = await res.json();

  document.getElementById("nome-usuario").innerText = data.nome;

  document.getElementById("btn-logout").onclick = logout;
}

// ================= MENU =================
function atualizarMenu() {
  const menu = document.querySelector(".menu");
  if (!menu) return;

  const usuario = getUsuario();

  if (usuario) {
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