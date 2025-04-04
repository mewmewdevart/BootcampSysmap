// setTimeout(() => {
//   let titulo = document.getElementById("titulo");
//   titulo.innerHTML = "Hello World!";
// }, 5000);

// // Aguarda o carregamento do DOM
// document.addEventListener("DOMContentLoaded", () => {
//   // Seleciona todos os botões de finalizar tarefa
//   const finishButtons = document.querySelectorAll(".btnFinish");

//   // Adiciona um evento de clique a cada botão
//   finishButtons.forEach((button) => {
//     button.addEventListener("click", () => {
//       // Remove o elemento pai do botão (o <li>)
//       const taskItem = button.parentElement;
//       taskItem.remove();
//     });
//   });
// });

const finishButtons = document.querySelectorAll(".taskList ul li button");

finishButtons.forEach((button) => {
  button.addEventListener("click", finishTask);
});

function finishTask(event) {
  const li = event.target.parentElement.parentElement;
  li.classList.toggle("done");

  if (li.classList.contains("done")) {
    event.target.innerHTML = "Desfazer";
    const textContinuous = li.querySelector("span.span-mother2");
  } else {
    event.target.innerHTML = "Finalizar";
  }
}

function removeTask(event) {
  const li = event.target.closest("li"); // Garantir que o elemento <li> correto seja selecionado
  if (li) {
    li.remove(); // Remove o elemento <li> diretamente
  }
}

function createStyledButton(text, className, clickHandler) {
  const button = document.createElement("button");
  button.classList.add(className);

  const spanMother = document.createElement("span");
  spanMother.classList.add("span-mother");
  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.innerText = char;
    spanMother.appendChild(span);
  });

  const spanMother2 = document.createElement("span");
  spanMother2.classList.add("span-mother2");
  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.innerText = char;
    spanMother2.appendChild(span);
  });

  button.appendChild(spanMother);
  button.appendChild(spanMother2);
  button.addEventListener("click", clickHandler);

  return button;
}

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = document.querySelector("input");
  const taskText = input.value;

  if (taskText === "") {
    return;
  }

  const span = document.createElement("span");
  span.innerText = taskText;

  const finishButton = createStyledButton("Finalizar", "btnAdd", finishTask);
  const removeButton = createStyledButton("Remover", "btnAdd", removeTask);

  const buttons = document.createElement("div");
  buttons.style.display = "flex";
  buttons.style.justifyContent = "space-between";
  buttons.appendChild(finishButton);
  buttons.appendChild(removeButton);

  const li = document.createElement("li");
  li.appendChild(span);
  li.appendChild(buttons);

  const ul = document.querySelector(".taskList ul");
  ul.prepend(li);
});
