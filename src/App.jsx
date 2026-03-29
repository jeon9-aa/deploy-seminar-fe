import { useState, useEffect } from 'react'

// 환경 변수에서 API URL을 가져오고, 없으면 localhost:8080 사용
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

function App() {
  const [todos, setTodos] = useState([])
  const [inputText, setInputText] = useState('')

  // 페이지 로드 시 Todo 목록 불러오기
  useEffect(() => {
    fetchTodos()
  }, [])

  // GET: Todo 목록 조회
  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_URL}/api/todos`)
      const data = await response.json()
      setTodos(data)
    } catch (error) {
      console.error('Todo 목록을 불러오는데 실패했습니다:', error)
    }
  }

  // POST: 새로운 Todo 추가
  const addTodo = async (e) => {
    e.preventDefault()
    if (!inputText.trim()) return

    try {
      const response = await fetch(`${API_URL}/api/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      })
      const newTodo = await response.json()
      setTodos([...todos, newTodo])
      setInputText('')
    } catch (error) {
      console.error('Todo 추가에 실패했습니다:', error)
    }
  }

  // PATCH: 완료 상태 토글
  const toggleTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/todos/${id}`, {
        method: 'PATCH',
      })
      const updatedTodo = await response.json()
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)))
    } catch (error) {
      console.error('Todo 상태 변경에 실패했습니다:', error)
    }
  }

  // DELETE: Todo 삭제
  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/api/todos/${id}`, {
        method: 'DELETE',
      })
      setTodos(todos.filter((todo) => todo.id !== id))
    } catch (error) {
      console.error('Todo 삭제에 실패했습니다:', error)
    }
  }

  return (
    <div className="app">
      <h1>Todo List</h1>

      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="할 일을 입력하세요"
          className="todo-input"
        />
        <button type="submit" className="add-button">
          추가
        </button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span
              onClick={() => toggleTodo(todo.id)}
              className={`todo-text ${todo.completed ? 'completed' : ''}`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="delete-button"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
