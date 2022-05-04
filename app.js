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
const radioBox = document.querySelector(".filter-inner");

let todos = [];

let log = console.log;

function generationID() {
    const id = Math.random().toString(16).slice(2);
    return id;
}

function updateTodos(text) {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].input === text) {
            todos[i].status = !todos[i].status;
        }
    }

    addTODOtoLS(todos);
}

function removeTODO() {
    log(todos);
    let completedTodo = todos.filter((item) => {
        return item.status != true;
    });
    log(completedTodo);
    todoList.innerHTML = "";
    completedTodo.forEach((item) => {
        drawTodo(item.input, item.status);
    });
    todos = completedTodo;
    addTODOtoLS(todos);
    itemsLeft();
    showFilterBlock();
}

function removeTODOitem(id) {
    const newTODO = todos.filter((item) => {
        return item.id != id;
    });
    log(newTODO);
    todos = newTODO;
    addTODOtoLS(todos);
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
    todos = JSON.parse(localStorage.getItem("TODOS"));
    if (todos != null) {
        for (let i = 0; i < todos.length; i++) {
            drawTodo(todos[i].id, todos[i].input, todos[i].status);
        }
    } else {
        todos = [];
    }
}

function drawTodo(id, value, status = false) {
    const newItem = document.createElement("li");
    newItem.classList.add("todo-item");
    newItem.id = id;
    newItem.innerHTML = `
    <label class="control">
        <input class="checkbox" type="checkbox" ${status ? "checked" : ""}/>
        <div class="custom-checkbox"></div>
        <div class="text">${value}</div>
    </label>
    <button class="btn-delete"></button>`;

    todoList.appendChild(newItem);

    itemsLeft();
    showFilterBlock();
}

function addTODO(value) {
    // event.preventDefault();
    let newItem = document.createElement("li");
    newItem.classList.add("todo-item");
    newItem.id = generationID();
    newItem.innerHTML = `
    <label class="control">
        <input class="checkbox" type="checkbox"/>
        <div class="custom-checkbox"></div>
        <div class="text">${value}</div>
    </label>
    <button class="btn-delete"></button>`;

    todoList.appendChild(newItem);
    log(todos);
    todos.push({ input: value, status: false });
    todoInput.value = "";

    addTODOtoLS(todos);

    itemsLeft();
    showFilterBlock();
}

function addTODOtoLS(array) {
    localStorage.setItem("TODOS", JSON.stringify(array));
    // log(JSON.parse(localStorage.getItem("TODOS")));
}

// todoList.addEventListener("click", (event) => {
//     if (event.target.classList.contains("control")) {
//         const text = event.path[0].outerText;
//         log(text);
//         updateTodos(text);
//     }
// });

radioBox.addEventListener("click", (event) => {
    // log(event.target.id);
    filter(event.target.id);
});

function filter(id) {
    const elem = document.querySelectorAll(".control input");
    if (id === "Active") {
        elem.forEach((item) => {
            if (item.checked === true) {
                item.closest("li").style.display = "none";
            }
        });
    } else if (id === "Completed") {
        elem.forEach((item) => {
            if (item.checked === false) {
                item.closest("li").style.display = "none";
            }
        });
    } else {
        elem.forEach((item) => {
            item.closest("li").style.display = "flex";
        });
    }
}

todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("control")) {
        const text = event.path[0].outerText;
        log(text);
        updateTodos(text);
    }

    if (event.target.classList.contains("btn-delete")) {
        log(event.target.parentElement.id);
        removeItem(event.target.parentElement);
        removeTODOitem(event.target.parentElement.id);
    }
    itemsLeft();
    // showFilterBlock();
});

function removeItem(element) {
    element.remove();
    itemsLeft();
    showFilterBlock();
}

clearBtn.addEventListener("click", () => {
    // const itemsDone = document.querySelectorAll(".control input:checked");
    // log(itemsDone);
    // itemsDone.forEach((element) => {
    //     removeItem(element.closest("li"));
    // });
    removeTODO();
    // itemsLeft();
    // showFilterBlock();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    // if (todoInput.value != "") {
    //     addTODO(todoInput.value);
    // }
    // todos.push({ value: todoInput.value, checked: false });
    // addTODOtoLS(todos);

    // itemsLeft();
    // showFilterBlock();

    const todoID = generationID();

    drawTodo(todoID, todoInput.value);

    todos.push({ id: todoID, input: todoInput.value, status: false });
    todoInput.value = "";

    addTODOtoLS(todos);
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

window.addEventListener("resize", (event) => {
    mobileView(event.target.innerWidth);
});

window.onload = function () {
    if (localStorage.getItem("theme") === "dark") {
        mainPage.classList.add("dark");
    }
    showFilterBlock();
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

mobileView(window.innerWidth);
// showFilterBlock();
drawTODOfromLS();
