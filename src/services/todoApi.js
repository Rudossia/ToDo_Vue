const API_URL = 'https://jsonplaceholder.typicode.com/todos'
const USER_ID = 1

async function request(url, options = {}) {
  const response = await fetch(url, {headers: { 'Content-Type': 'application/json', ...options.headers,},  ...options})
  if (!response.ok) {
    throw new Error('Ошибка при выполнении запроса к API')
  }
  return response.json()
}

export async function fetchTodos() {
  return request(`${API_URL}?userId=${USER_ID}&_limit=5`)
}

export async function createTodo(title) {
  return request(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      title,
      completed: false,
      userId: USER_ID,
    }),
  })
}

export async function updateTodoStatus(id, completed) {
  return request(`${API_URL}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      completed,
    }),
  })
}

export async function deleteTodo(id) {
  return request(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
}