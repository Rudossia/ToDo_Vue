<script setup>
import { onMounted, ref } from 'vue'
import TodoItem from './components/TodoItem.vue'
import Popup from './components/Popup.vue'
import { useTodos } from './composables/useTodos'

const newTodoTitle = ref('')
const isDeletePopupOpen = ref(false)
const selectedTodo = ref(null)

const {
  todos,
  isLoading,
  errorMessage,
  loadTodos,
  addTodo,
  toggleTodo,
  removeTodo,
} = useTodos()

onMounted(() => {
  loadTodos()
})

async function handleAddTodo() {
  await addTodo(newTodoTitle.value)
  newTodoTitle.value = ''
}

function openDeletePopup(todo) {
  selectedTodo.value = todo
  isDeletePopupOpen.value = true
}

function closeDeletePopup() {
  selectedTodo.value = null
  isDeletePopupOpen.value = false
}

async function confirmDelete() {
  if (!selectedTodo.value) {
    return
  }

  await removeTodo(selectedTodo.value)
  closeDeletePopup()
}
</script>

<template>
  <main class="app">
    <section class="todo-card">
      <header class="todo-header">
        <h1>Advanced Vue ToDo List</h1>
        <p class="description">
          Приложение для управления задачами с Composition API,
          localStorage, fake API и модальным окном на Vue Teleport.
        </p>
      </header>

      <form class="todo-form" @submit.prevent="handleAddTodo">
        <input v-model="newTodoTitle" type="text" placeholder="Введите новую задачу" />

        <button type="submit">
          Добавить
        </button>
      </form>

      <p v-if="errorMessage" class="error-message">  {{ errorMessage }} </p>

      <p v-if="isLoading" class="loading-message"> Загрузка задач... </p>

      <ul v-else-if="todos.length" class="todo-list">
        <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" @toggle="toggleTodo" @delete="openDeletePopup" />
      </ul>

      <p v-else class="empty-message">
        Пока задач нет. Добавьте первую задачу.
      </p>
    </section>

    <Popup :is-open="isDeletePopupOpen" @close="closeDeletePopup">
      <div class="delete-confirmation">
        <div class="warning-icon">!</div>
        <h2>Удалить задачу?</h2>
        <p> Вы действительно хотите удалить задачу <strong>«{{ selectedTodo?.title }}»</strong>?</p>

        <div class="popup-actions">
          <button class="cancel-button" type="button" @click="closeDeletePopup">
            Нет, отменить
          </button>
          <button class="confirm-button" type="button" @click="confirmDelete">
            Да, удалить
          </button>
        </div>
      </div>
    </Popup>
  </main>
</template>