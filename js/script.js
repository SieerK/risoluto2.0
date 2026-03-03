const borderColorElement = document.getElementById('borderColor');
const selectStatus = document.getElementById('Status');

function updateStatusStyle() {
  const status = selectStatus.value;

  selectStatus.classList.remove('online', 'ausente', 'ocupado');

  if (status === 'Online') {
    borderColorElement.style.border = '2px solid #7cbd28';
    selectStatus.classList.add('online');
  } 

  if (status === 'Ausente') {
    borderColorElement.style.border = '2px solid #f1c40f';
    selectStatus.classList.add('ausente');
  } 

  if (status === 'Ocupado') {
    borderColorElement.style.border = '2px solid #e74c3c';
    selectStatus.classList.add('ocupado');
  }

  localStorage.setItem('statusUsuario', status);
}

// Recupera status salvo
const statusSalvo = localStorage.getItem('statusUsuario');
if (statusSalvo) {
  selectStatus.value = statusSalvo;
}

selectStatus.addEventListener('change', updateStatusStyle);
updateStatusStyle();
