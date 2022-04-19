const themeBtn = document.querySelector(".theme-btn");
const mainPage = document.querySelector(".page");
const todoInput = document.querySelector(".todo-input");
const form = document.querySelector(".form");
const todoList = document.querySelector(".todo-list");
const todoCounter = document.querySelector(".counter");
const checkbox = document.querySelector(".checkbox");
const todos = [];
const todoItem = document.querySelectorAll(".todo-item");

const clearBtn = document.querySelector(".clear");

let log = console.log;

// todoItem.forEach((element) => console.log(element.children));

function addTODO() {
    // event.preventDefault();
    let newItem = document.createElement("li");
    newItem.classList.add("todo-item");
    newItem.innerHTML = `
    <label class="control">
        <input class="checkbox" type="checkbox"/>
        <div class="custom-checkbox"></div>
        <div class="text">${todoInput.value}</div>
    </label>
    <button class="btn-delete"></button>`;

    todoList.appendChild(newItem);

    // todoCounter.innerHTML = `${todoList.length} items left`;

    todoInput.value = "";

    // log(todos);
}

todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-delete")) {
        event.target.parentElement.remove();
    }
});

clearBtn.addEventListener("click", () => {
    const itemsLeft = document.querySelectorAll(".control input:checked");
    log(itemsLeft);
    itemsLeft.forEach((element) => {
        element.closest("li").remove();
    });
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    todos.push({ value: todoInput.value, checked: false });
    addTODO();
});

themeBtn.addEventListener("click", switchThemeColor);

function switchThemeColor() {
    if (!mainPage.classList.contains("dark")) {
        mainPage.classList.add("dark");
        localStorage.setItem("theme", "dark");
    } else {
        mainPage.classList.remove("dark");
        localStorage.removeItem("theme");
    }
}

window.onload = function () {
    if (localStorage.getItem("theme") === "dark") {
        mainPage.classList.add("dark");
    }
};

window.onload = function () {
    log(window.innerWidth);
    if (window.innerWidth <= 544) {
        document
            .querySelector(".todo-filter")
            .after(document.querySelector(".filter-inner"));
    } else {
        document
            .querySelector(".counter")
            .after(document.querySelector(".filter-inner"));
    }
};

window.addEventListener("resize", (event) => {
    if (event.target.innerWidth <= 544) {
        document
            .querySelector(".todo-filter")
            .after(document.querySelector(".filter-inner"));
    } else {
        document
            .querySelector(".counter")
            .after(document.querySelector(".filter-inner"));
    }
    // log(e.target.innerWidth);
});
