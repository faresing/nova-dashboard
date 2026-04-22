// ============================
// DATOS Y ESTRUCTURAS
// ============================

// Array de usuarios
let users = [];

// Map para guardar sesiones activas
let session = new Map();

// Set de secciones disponibles
const sections = new Set(["login", "signup", "dashboard", "about"]);

// Usuario actual
let currentUser = null;

// ============================
// FUNCIÓN PRINCIPAL
// ============================

const app = document.getElementById("app");

// Mostrar navegación
function renderNav() {
  if (!currentUser) return "";

  return `
    <nav>
      <div><strong>🚀 NovaSpace</strong></div>
      <div>
        <button onclick="navigate('dashboard')">Dashboard</button>
        <button onclick="navigate('about')">About Us</button>
        <button onclick="logout()">Logout</button>
      </div>
    </nav>
  `;
}

// Navegación sin recargar página
function navigate(section) {
  if (!sections.has(section)) return;

  switch (section) {
    case "dashboard":
      renderDashboard();
      break;
    case "about":
      renderAbout();
      break;
    case "login":
      renderLogin();
      break;
    case "signup":
      renderSignup();
      break;
  }
}

// ============================
// LOGIN
// ============================

function renderLogin() {
  app.innerHTML = `
    <div class="container">
      <div class="card">
        <h2>Iniciar Sesión</h2>
        <input id="email" placeholder="Email" />
        <input id="password" type="password" placeholder="Contraseña" />
        <button class="primary" onclick="login()">Entrar</button>
        <p onclick="navigate('signup')" style="cursor:pointer;margin-top:10px;">
          ¿No tienes cuenta? Regístrate
        </p>
      </div>
    </div>
  `;
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let found = false;
  let i = 0;

  // Uso de WHILE
  while (i < users.length) {
    if (users[i].email === email && users[i].password === password) {
      currentUser = users[i];
      session.set("user", currentUser);
      found = true;
      break;
    }
    i++;
  }

  if (found) {
    renderDashboard();
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}

// ============================
// SIGNUP
// ============================

function renderSignup() {
  app.innerHTML = `
    <div class="container">
      <div class="card">
        <h2>Registro</h2>
        <input id="name" placeholder="Nombre" />
        <input id="email" placeholder="Email" />
        <input id="password" type="password" placeholder="Contraseña" />
        <button class="primary" onclick="signup()">Crear cuenta</button>
        <p onclick="navigate('login')" style="cursor:pointer;margin-top:10px;">
          Ya tengo cuenta
        </p>
      </div>
    </div>
  `;
}

function signup() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Todos los campos son obligatorios");
    return;
  }

  users.push({ name, email, password });
  alert("Usuario creado correctamente");
  navigate("login");
}

// ============================
// DASHBOARD
// ============================

function renderDashboard() {
  app.innerHTML = `
    ${renderNav()}
    <div class="container">
      <div class="card">
        <h2>Bienvenido, ${currentUser.name} 👋</h2>
        <p>Este es tu panel de control personal.</p>
        <ul id="stats"></ul>
      </div>
    </div>
  `;

  const stats = ["Proyectos", "Mensajes", "Notificaciones"];
  const ul = document.getElementById("stats");

  // Uso de FOR
  for (let i = 0; i < stats.length; i++) {
    const li = document.createElement("li");
    li.textContent = `✔ ${stats[i]} activos`;
    ul.appendChild(li);
  }
}

// ============================
// ABOUT US
// ============================

function renderAbout() {
  app.innerHTML = `
    ${renderNav()}
    <div class="container">
      <div class="card">
        <h2>Sobre NovaSpace</h2>
        <p>
          NovaSpace es una plataforma ficticia creada para demostrar
          habilidades en JavaScript, diseño web y programación dinámica.
        </p>
      </div>
    </div>
  `;
}

// ============================
// LOGOUT
// ============================

function logout() {
  session.clear();
  currentUser = null;
  renderLogin();
}

// ============================
// INICIO
// ============================

renderLogin();