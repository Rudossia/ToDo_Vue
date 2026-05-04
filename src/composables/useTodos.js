import { ref, watch } from 'vue'
import {
  createTodo,
  updateTodoStatus,
  deleteTodo,
} from '../services/todoApi'

const STORAGE_KEY = 'advanced-vue-todos'

export function useTodos() {
  const todos = ref([])
  const isLoading = ref(false)
  const errorMessage = ref('')

  function saveToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
  }

  function loadFromLocalStorage() {
    const savedTodos = localStorage.getItem(STORAGE_KEY)

    if (savedTodos) {
      todos.value = JSON.parse(savedTodos)
    }
  }

  function loadTodos() {
    errorMessage.value = ''
    loadFromLocalStorage()
  }

  async function addTodo(title) {
    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      errorMessage.value = 'Название задачи не может быть пустым.'
      return
    }

    try {
      errorMessage.value = ''

      const createdTodo = await createTodo(trimmedTitle)

      const newTodo = {
        id: Date.now(),
        serverId: createdTodo.id,
        title: trimmedTitle,
        completed: false,
      }

      todos.value.unshift(newTodo)
    } catch (error) {
      errorMessage.value =
        'Не удалось добавить задачу. Изменения не были сохранены.'
    }
  }

  async function toggleTodo(todo) {
    try {
      errorMessage.value = ''

      const newCompletedValue = !todo.completed

      await updateTodoStatus(todo.serverId || todo.id, newCompletedValue)

      todo.completed = newCompletedValue
    } catch (error) {
      errorMessage.value =
        'Не удалось изменить статус задачи. Изменения не были сохранены.'
    }
  }

  async function removeTodo(todo) {
    try {
      errorMessage.value = ''

      await deleteTodo(todo.serverId || todo.id)

      todos.value = todos.value.filter((item) => item.id !== todo.id)
    } catch (error) {
      errorMessage.value =
        'Не удалось удалить задачу. Изменения не были сохранены.'
    }
  }

  watch(
    todos,
    () => {
      saveToLocalStorage()
    },
    { deep: true }
  )

  return {
    todos,
    isLoading,
    errorMessage,
    loadTodos,
    addTodo,
    toggleTodo,
    removeTodo,
  }
}