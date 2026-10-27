<script setup lang="ts">
import { computed, readonly, ref, watch } from 'vue';

// Define the disabled prop with a default value of false
const props = withDefaults(
    defineProps<{
        disabled?: boolean
        rating: number
    }>(),
    {
        disabled: false,
    }
);

const emit = defineEmits<{
    click: [value: number]
}>();

// ozbiljna komplikacija
// definisi promenjivu
const localRating = ref<number>(props.rating)

// computable se koristi da se drzi izmednju minimuma i maksimuma
const safeRating = computed({
    get: () => Math.min(Math.max(localRating.value, 0), 5),
    set: (newValue: number) => {
        localRating.value = Math.min(Math.max(newValue, 0), 5)
    }
})

// gleda se props.rating u slucaju da se promeni, da obavesti localRating
watch(() => props.rating, (newRating) => {
    localRating.value = newRating
})

function clickHandler(n: number){
    if(props.disabled) return;
    safeRating.value = n;
    emit("click", n)
}


</script>

<template>
    <div :class="disabled ? '' : 'enabled'">
        <i 
            v-for="n in 5" 
            :key="n" 
            :class="n <= localRating ? 'fa-solid fa-star' : 'fa-regular fa-star'"
            @click="clickHandler(n)"
        ></i>
    </div>
</template>

<style>
.enabled > i:hover{
    color: var(--bs-primary)
}
</style>