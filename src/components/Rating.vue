<script setup lang="ts">
import { readonly } from 'vue';

// Define the disabled prop with a default value of false
const props = withDefaults(
    defineProps<{
        disabled?: boolean;
    }>(),
    {
        disabled: false,
    }
);

// Define the v-model for the number
// The 'set' interceptor ensures the value stays between 0 and 5 
// even if the user types a number outside the range directly.
const model = defineModel<number>({
    default: 0,
    set(value) {
        // Fallback to 0 if the input is cleared/NaN
        if (value === undefined || isNaN(value)) return 0;
        // Clamp the value between 0 and 5
        return Math.max(0, Math.min(5, value));
    },
});

const emit = defineEmits<{
    click: [value: number]
}>();

function clickHandler(n: number){
    if(props.disabled) return;

    model.value = n;
    
    emit("click", n)
}


</script>

<template>
    <div :class="disabled ? '' : 'enabled'">
        <i 
            v-for="n in 5" 
            :key="n" 
            :class="n <= model ? 'fa-solid fa-star' : 'fa-regular fa-star'"
            @click="clickHandler(n)"
        ></i>
    </div>
</template>

<style>
.enabled > i:hover{
    color: var(--bs-primary)
}
</style>