<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="popup-overlay" @click.self="emit('close')">
      <div class="popup-window">
        <button class="popup-close" type="button" @click="emit('close')">
          ×
        </button>

        <slot />
      </div>
    </div>
  </Teleport>
</template>