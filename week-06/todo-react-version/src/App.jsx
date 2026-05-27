import { useEffect, useRef, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'simple-todos'

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function createId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

function App() {
  const [todos, setTodos] = useState(loadTodos)
  const [input, setInput] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return

    setTodos((prev) => [
      ...prev,
      {
        id: createId(),
        text: trimmed,
        completed: false,
        createdAt: Date.now(),
      },
    ])
    setInput('')
    inputRef.current?.focus()
  }

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  return (
    <main className="container">
      <header className="header">
        <h1>할 일 목록</h1>
      </header>

      <form className="todo-form" autoComplete="off" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="todo-input"
          type="text"
          placeholder="할 일을 입력하세요"
          maxLength={200}
          required
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="add-btn" type="submit">추가</button>
      </form>

      {todos.length === 0 ? (
        <p className="empty-message">아직 할 일이 없습니다.</p>
      ) : (
        <ul className="todo-list" aria-live="polite">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item${todo.completed ? ' completed' : ''}`}
            >
              <input
                type="checkbox"
                className="todo-checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                aria-label="완료 처리"
              />
              <span className="todo-text">{todo.text}</span>
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeTodo(todo.id)}
                aria-label="할 일 삭제"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default App
