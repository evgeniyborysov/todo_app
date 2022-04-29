const themeBtn = document.querySelector(".theme-btn");
const mainPage = document.querySelector(".page");
const todoInput = document.querySelector(".todo-input");
const form = document.querySelector(".form");
const todoList = document.querySelector(".todo-list");
const todoCounter = document.querySelector(".counter");
const checkbox = document.querySelector(".checkbox");
const todoItem = document.querySelectorAll(".todo-item");
const clearBtn = document.querySelector(".clear");
const filterBlock = document.querySelector(".filter-container");

const todos = [];

let log = console.log;
log(todos);

function showFilterBlock() {
    const items = document.querySelectorAll(".control input");
    if (items.length === 0) {
        filterBlock.classList.remove("show");
        filterBlock.classList.add("hide");
    } else {
        filterBlock.classList.remove("hide");
        filterBlock.classList.add("show");
    }
}

showFilterBlock();

function filter() {
    const elem = document.querySelectorAll(".control input");
    elem.forEach((item) => {
        if (item.checked === true) {
            item.closest("li").style.display = "none";
        }
    });
}

function itemsLeft() {
    let count = 0;
    const elem = document.querySelectorAll(".control input");
    elem.forEach((item) => {
        if (item.checked !== true) {
            count++;
        }
    });
    todoCounter.innerHTML = `${count} items left`;
}

function drawTODOfromLS() {
    let a = JSON.parse(localStorage.getItem("TODOS"));
    log(a[0].value);

    for (let i = 0; i < a.length; i++) {
        let newItem = document.createElement("li");
        newItem.classList.add("todo-item");
        newItem.innerHTML = `
        <label class="control">
            <input class="checkbox" type="checkbox" checked:${a[i].checked}/>
            <div class="custom-checkbox"></div>
            <div class="text">${a[i].value}</div>
        </label>
        <button class="btn-delete"></button>`;

        todoList.appendChild(newItem);
    }
    itemsLeft();
    showFilterBlock();
}

drawTODOfromLS();

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
    todoInput.value = "";
}

function addTODOtoLS(array) {
    localStorage.setItem("TODOS", JSON.stringify(array));
    // log(JSON.parse(localStorage.getItem("TODOS")));
}

todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-delete")) {
        event.target.parentElement.remove();
    }
    itemsLeft();
    showFilterBlock();
});

clearBtn.addEventListener("click", () => {
    const itemsDone = document.querySelectorAll(".control input:checked");
    log(itemsDone);
    itemsDone.forEach((element) => {
        element.closest("li").remove();
    });
    itemsLeft();
    showFilterBlock();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    todos.push({ value: todoInput.value, checked: false });
    addTODOtoLS(todos);
    addTODO();
    itemsLeft();
    showFilterBlock();
    // log(todos);
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

// window.onload = function () {
//     log(window.innerWidth);
//     if (window.innerWidth <= 544) {
//         document
//             .querySelector(".todo-filter")
//             .after(document.querySelector(".filter-inner"));
//     } else {
//         document
//             .querySelector(".counter")
//             .after(document.querySelector(".filter-inner"));
//     }
// };

window.addEventListener("resize", (event) => {
    mobileView(event.target.innerWidth);
});

window.onload = function () {
    if (localStorage.getItem("theme") === "dark") {
        mainPage.classList.add("dark");
    }
};

function mobileView(width) {
    if (width <= 544) {
        document
            .querySelector(".todo-filter")
            .after(document.querySelector(".filter-inner"));
    } else {
        document
            .querySelector(".counter")
            .after(document.querySelector(".filter-inner"));
    }
}

mobileView(window.innerWidth);
