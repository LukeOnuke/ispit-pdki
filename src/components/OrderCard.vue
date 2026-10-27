<script setup lang="ts">
import { OrderStatus } from '@/models/order-status.model';
import type { OrderModel } from '@/models/order.model';
import { ref, useAttrs } from 'vue'
import Rating from './Rating.vue';
import { UserService } from '@/services/user.service';

const props = defineProps<{
    order: OrderModel
    allowRating?: boolean
}>()

const emit = defineEmits<{
    (e: 'remove', order: OrderModel): void
}>()

const rating = ref<number>(0);
const rawRating = UserService.getRating(props.order.plant.id);
if(rawRating) rating.value = rawRating.ratingScore;
console.log(rating.value)

const statusClasses = {
  [OrderStatus.ARRIVED]: 'text-bg-success',
  [OrderStatus.CANCELED]: 'text-bg-danger',
  [OrderStatus.RESERVED]: 'text-bg-info'
}

function rate(ratingScore: number){
    UserService.removeRating(props.order.plant.id)
    UserService.addRating(props.order.plant.id, ratingScore)
}
</script>

<template>
    <div class="card">
        <div class="card-header">
            <h3>
                {{ order.plant.name }} 
                <small class="text-body-secondary">{{ order.plant.latin_name }}</small>
            </h3>
            <Rating :disabled="!allowRating" :rating="rating" @click="rate"></Rating>
        </div>
        <div class="card-body row">
            <img :src="order.plant.image_url" :alt="order.plant.image_alt" class="col-12 col-md-4">
            <div class="col-12 col-md-8">
                <p>{{ order.plant.description }}</p>
                <p>{{ order.plant.plant_type }}</p>
                <p><strong>{{ order.plant.price }} {{ order.plant.currency }}</strong></p>
                <hr>
                <p>
                    <span class="badge" :class="statusClasses[order.orderStatus]">
                        {{ order.orderStatus }}
                    </span>
                </p>
            </div>
        </div>
        <div class="card-footer d-flex">
            <button class="btn btn-danger ms-auto" @click="emit('remove', order)">
                <i class="fa-regular fa-circle-xmark"></i> Ukloni
            </button>
        </div>
    </div>
</template>