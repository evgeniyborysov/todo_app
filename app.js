const themeBtn = document.querySelector(".theme-btn");
const mainPage = document.querySelector(".page");
const todoInput = document.querySelector(".todo-input");
const form = document.querySelector(".form");
const todoList = document.querySelector(".todo-list");
const todoCounter = document.querySelector(".counter");
const checkbox = document.querySelector(".checkbox");

let log = console.log;

log(checkbox);

function addTODO() {
    // event.preventDefault();
    let newItem = document.createElement("li");
    newItem.classList.add("todo-item");
    newItem.innerHTML = `
    <label class="control">
        <input class="checkbox" type="checkbox" />
        <div class="custom-checkbox"></div>
        <div class="text">${todoInput.value}</div>
    </label>
    <button class="btn-delete"></button>`;

    todoList.appendChild(newItem);
    todoInput.value = "";
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    addTODO();
});

themeBtn.addEventListener("click", () => {
    mainPage.classList.toggle("dark");
    // console.log("ok");
});
