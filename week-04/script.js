(function () {
  "use strict";

  const STORAGE_KEY = "simple-todos";

  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");
  const emptyMessage = document.getElementById("empty-message");

  const state = {
    todos: loadTodos(),
  };

  function loadTodos() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
  }

  function createId() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function addTodo(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    state.todos.push({
      id: createId(),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    });
    saveTodos();
    render();
  }

  function toggleTodo(id) {
    state.todos = state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos();
    render();
  }

  function removeTodo(id) {
    state.todos = state.todos.filter((todo) => todo.id !== id);
    saveTodos();
    render();
  }

  function createTodoElement(todo) {
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.completed ? " completed" : "");
    li.dataset.id = todo.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", "완료 처리");

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "삭제";
    deleteBtn.setAttribute("aria-label", "할 일 삭제");

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    return li;
  }

  function render() {
    list.replaceChildren();

    if (state.todos.length === 0) {
      emptyMessage.hidden = false;
      return;
    }
    emptyMessage.hidden = true;

    const fragment = document.createDocumentFragment();
    for (const todo of state.todos) {
      fragment.appendChild(createTodoElement(todo));
    }
    list.appendChild(fragment);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    addTodo(input.value);
    input.value = "";
    input.focus();
  });

  list.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.type !== "checkbox") return;

    const li = target.closest(".todo-item");
    if (!li) return;
    toggleTodo(li.dataset.id);
  });

  list.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!target.classList.contains("delete-btn")) return;

    const li = target.closest(".todo-item");
    if (!li) return;
    removeTodo(li.dataset.id);
  });

  render();
})();
