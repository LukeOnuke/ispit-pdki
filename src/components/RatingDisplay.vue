<script setup lang="ts">
import type { PlantModel } from '@/models/plant.model';
import type { RatingModel } from '@/models/rating.model';
import { PlantService } from '@/services/plant.service';
import { ref } from 'vue';
import Rating from './Rating.vue';
import { UserService } from '@/services/user.service';
import { AlertService } from '@/services/alert.service';

const props = defineProps<{
    rating: RatingModel
}>()

const plant = ref<PlantModel>();
PlantService.getIndividualPlant(props.rating.plantId).then(data => {
    plant.value = data;
})

function deleteRating() {
    AlertService.confirm("Brisanje", `Izbrisati ocenu za ${plant.value ? plant.value.name : "biljku"}?`, () => {
        props.rating.deletedAt = new Date()
        UserService.removeRating(props.rating.plantId)
        window.location.reload()
    })
}
</script>

<template>
    <section v-if="!rating.deletedAt" :key="`rating-${rating.plantId}`" class="card mt-3">
        <div class="card-header d-flex flex-row align-items-center justify-content-between">
            <h5>
                <RouterLink v-if="plant" :to="`/plant/${plant.id}`">{{ plant.name }}</RouterLink>
                <div v-else class="spinner-border text-secondary" role="status">
                    <span class="visually-hidden">Učitavanje...</span>
                </div>
            </h5>
            <button class="btn btn-danger" @click="deleteRating"><i class="fa-regular fa-circle-xmark"></i></button>
        </div>
        <div class="card-body">
            <Rating :rating="rating.ratingScore" disabled></Rating>
        </div>
    </section>
</template>