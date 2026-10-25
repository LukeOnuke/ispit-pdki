<template>
  <div>
    <!-- The slider container -->
    <div ref="sliderRef" class="mt-2 mb-4"></div>

    <!-- Optional: Value display. You can remove this and handle it in the parent if preferred -->
    <div class="d-flex justify-content-between">
      <span class="text-muted">Min: <span v-text="modelValue[0]"></span></span>
      <span class="text-muted">Max: <span v-text="modelValue[1]"></span></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

// 1. Define the props for global limits and the selected range
const props = defineProps({
  modelValue: {
    type: Array,
    required: true // Expects an array like [20, 80]
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  }
});

// 2. Define the emit for v-model two-way binding
const emit = defineEmits(['update:modelValue', 'change']);

const sliderRef = ref(null);

onMounted(() => {
  // Initialize slider with props
  noUiSlider.create(sliderRef.value, {
    start: props.modelValue,
    connect: true,
    step: 1,
    range: {
      'min': props.min,
      'max': props.max
    }
  });

  // 3. Emit changes to the parent when the user drags the slider handles
  sliderRef.value.noUiSlider.on('update', (values) => {
    const newValues = [Math.round(values[0]), Math.round(values[1])];

    // Only emit if the values actually changed to prevent infinite loops
    if (newValues[0] !== props.modelValue[0] || newValues[1] !== props.modelValue[1]) {
      emit('update:modelValue', newValues);
    }
  });

  // 2. Fires ONLY when the user drops the handle (Great for API calls)
  sliderRef.value.noUiSlider.on('change', (values) => {
    const newValues = [Math.round(values[0]), Math.round(values[1])];
    emit('change', newValues);
  });
});

// 4. Watch for programmatic changes to the selected range from the parent
watch(() => props.modelValue, (newVal) => {
  if (sliderRef.value && sliderRef.value.noUiSlider) {
    const current = sliderRef.value.noUiSlider.get().map(Number);
    // Update the UI if the parent changed the values externally
    if (current[0] !== newVal[0] || current[1] !== newVal[1]) {
      sliderRef.value.noUiSlider.set(newVal);
    }
  }
}, { deep: true });

// 5. Watch for changes to the global min and max limits
watch([() => props.min, () => props.max], ([newMin, newMax]) => {
  if (sliderRef.value && sliderRef.value.noUiSlider) {
    sliderRef.value.noUiSlider.updateOptions({
      range: {
        'min': newMin,
        'max': newMax
      }
    });
  }
});

onUnmounted(() => {
  if (sliderRef.value && sliderRef.value.noUiSlider) {
    sliderRef.value.noUiSlider.destroy();
  }
});
</script>

<style scoped>
/* The main slider track */
:deep(.noUi-target) {
  background-color: var(--bs-secondary-bg);
  border-color: var(--bs-border-color);
  box-shadow: none;
  /* Removes the default inset shadow for a flatter, modern look */
}

/* The colored bar between handles */
:deep(.noUi-connect) {
  background-color: var(--bs-primary);
}

/* The draggable handles */
:deep(.noUi-handle) {
  background-color: var(--bs-body-bg);
  border-color: var(--bs-border-color);
  border-radius: 50%;
  /* Makes them circular */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  /* Soft shadow works in both modes */
}

/* The little grip lines inside the handles */
:deep(.noUi-handle::before),
:deep(.noUi-handle::after) {
  background-color: var(--bs-border-color);
}

/* Optional: Add a focus ring when interacting with the handle */
:deep(.noUi-handle:focus-visible) {
  outline: none;
  box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);
}
</style>