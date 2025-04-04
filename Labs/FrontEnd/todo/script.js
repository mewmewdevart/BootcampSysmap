setTimeout(() => {
  let titulo = document.getElementById("titulo");
  titulo.innerHTML = "Hello World!";
}, 5000);


// Aguarda o carregamento do DOM
document.addEventListener("DOMContentLoaded", () => {
  // Seleciona todos os botões de finalizar tarefa
  const finishButtons = document.querySelectorAll(".btnFinish");

  // Adiciona um evento de clique a cada botão
  finishButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove o elemento pai do botão (o <li>)
      const taskItem = button.parentElement;
      taskItem.remove();
    });
  });
});