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

const relogio = document.querySelector(".clock");
function atualizarRelogio() {
  const data = new Date();
  const horas = data.getHours().toString().padStart(2, "0");
  const minutos = data.getMinutes().toString().padStart(2, "0");
  const segundos = data.getSeconds().toString().padStart(2, "0");
  relogio.textContent = `${horas}:${minutos}:${segundos}`;
}
setInterval(atualizarRelogio, 1000);

const ctx = document.getElementById("grafico");

new Chart(ctx, {
  type: "line",
  data: {
    labels: ["02/03", "03/03", "04/03", "05/03", "06/03", "09/03", "10/03"],
    datasets: [
      {
        label: "Horas trabalhadas",
        data: [5.9, 6.3, 5.8, 5.88, 5.72, 6.02, 5.82],
        borderColor: "#6bbecb",
        backgroundColor: "#6bbecb",
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        min: 5.5,
        max: 6.7,
        grid: {
          color: "#d8d8d8",
        },
        ticks: {
          callback: function (value) {
            const horas = Math.floor(value);
            const minutos = Math.round((value - horas) * 60);
            return `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}`;
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  },
});
