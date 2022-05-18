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
        drawTODO(item.id, item.input, item.status);
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
        todos.forEach((todo) => {
            drawTODO(todo.id, todo.input, todo.status);
        });
    } else {
        todos = [];
    }
}

function drawTODO(id, value, status = false) {
    const newTODO = document.createElement("li");
    newTODO.classList.add("todo-item");
    newTODO.id = id;
    newTODO.innerHTML = `
    <label class="control">
        <input class="checkbox" type="checkbox" ${status ? "checked" : ""}/>
        <div class="custom-checkbox"></div>
        <div class="text">${value}</div>
    </label>
    <button class="btn-delete"></button>`;

    todoList.appendChild(newTODO);

    itemsLeft();
    showFilterBlock();
}

function addTODOtoLS(array) {
    localStorage.setItem("TODOS", JSON.stringify(array));
}

function filterTODO(id) {
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

function removeItem(element) {
    element.remove();
    itemsLeft();
    showFilterBlock();
}

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
    showFilterBlock();
    mobileView(window.innerWidth);
    drawTODOfromLS();
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

// Listeners

themeBtn.addEventListener("click", switchThemeColor);

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
    const todo = todoInput.value.trim();
    if (todo != "") {
        const todoID = generationID();

        drawTODO(todoID, todo);

        todos.push({ id: todoID, input: todo, status: false });
        todoInput.value = "";

        addTODOtoLS(todos);
    }
});

window.addEventListener("resize", (event) => {
    mobileView(event.target.innerWidth);
});

radioBox.addEventListener("click", (event) => {
    // log(event.target.id);
    filterTODO(event.target.id);
});
