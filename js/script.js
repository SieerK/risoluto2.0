const borderColorElement = document.getElementById("borderColor");
const selectStatus = document.getElementById("Status");

function updateStatusStyle() {
  const status = selectStatus.value;

  selectStatus.classList.remove("online", "ausente", "ocupado");

  if (status === "Online") {
    borderColorElement.style.border = "2px solid #7cbd28";
    selectStatus.classList.add("online");
  } else if (status === "Ausente") {
    borderColorElement.style.border = "2px solid #f1c40f";
    selectStatus.classList.add("ausente");
  } else if (status === "Ocupado") {
    borderColorElement.style.border = "2px solid #e74c3c";
    selectStatus.classList.add("ocupado");
  }

  localStorage.setItem("statusUsuario", status);
}

// Recupera status salvo
const statusSalvo = localStorage.getItem("statusUsuario");
if (statusSalvo) selectStatus.value = statusSalvo;

selectStatus.addEventListener("change", updateStatusStyle);
updateStatusStyle();

function applyResponsiveState() {
  const sidebar = document.querySelector(".sidebar");
  const layout = document.querySelector(".layout");
  if (!sidebar || !layout) return;

  // melhor que screen.width pra responsividade
  if (window.innerWidth <= 1630) {
    sidebar.classList.add("is-closed");
    layout.classList.add("adapt");
  } else {
    sidebar.classList.remove("is-closed");
    layout.classList.remove("adapt");
  }
}

function responsivity() {
  const sidebarToggler = document.getElementById("sidebarToggler");
  const sidebar = document.querySelector(".sidebar");
  const layout = document.querySelector(".layout");
  if (!sidebarToggler || !sidebar || !layout) return;

  // Estado inicial ao carregar
  applyResponsiveState();

  // Atualiza se a janela mudar de tamanho
  window.addEventListener("resize", applyResponsiveState);

  // Um único clique controla tudo
  sidebarToggler.addEventListener("click", () => {
    sidebar.classList.toggle("is-closed");
    layout.classList.toggle("adapt");
  });
}

responsivity();
