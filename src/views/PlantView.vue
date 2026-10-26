<script setup>
defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})
</script>

<template>
  <div>
    <p>The ID is: {{ id }}</p>
  </div>
</template>