const themeBtn = document.querySelector(".theme-btn");
const mainPage = document.querySelector(".page");
const todoInput = document.querySelector(".todo-input");
const form = document.querySelector(".form");
const todoList = document.querySelector(".todo-list");
const todoCounter = document.querySelector(".counter");
const checkbox = document.querySelector(".checkbox");
const todos = [];

let log = console.log;

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

    todoCounter.innerHTML = `${todos.length} items left`;

    todoInput.value = "";

    log(todos);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    todos.push({ value: todoInput.value, cheked: false });
    addTODO();
});

// themeBtn.addEventListener("click", () => {
//     mainPage.classList.toggle("dark");
//     // console.log("ok");
// });

themeBtn.addEventListener("click", switchThemeColor);

function switchThemeColor() {
    if (!mainPage.classList.contains("dark")) {
        mainPage.classList.add("dark");
        localStorage.setItem("theme", "dark");
        console.log("1");
    } else {
        mainPage.classList.remove("dark");
        localStorage.removeItem("theme");
        console.log("2");
    }
}

window.onload = function () {
    if (localStorage.getItem("theme") === "dark") {
        mainPage.classList.add("dark");
    }
};
