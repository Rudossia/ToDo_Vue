<script setup>
defineProps({
  todo: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['toggle', 'delete'])
</script>

<template>
  <li class="todo-item" :class="{ completed: todo.completed }">
    <label class="todo-label">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="emit('toggle', todo)"
      />

      <span>{{ todo.title }}</span>
    </label>

    <button
      class="delete-button"
      type="button"
      aria-label="Удалить задачу"
      @click="emit('delete', todo)"
    >
      ×
    </button>
  </li>
</template>