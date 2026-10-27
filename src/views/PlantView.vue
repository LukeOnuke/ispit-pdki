<script setup lang="ts">
import type { PlantModel } from '@/models/plant.model.ts';
import { PlantService } from '@/services/plant.service';
import { UserService } from '@/services/user.service';
import Rating from '@/components/Rating.vue';
import { ref } from 'vue';

const props = defineProps({
  id: {
    type: [Number],
    required: true
  }
})

const plant = ref<PlantModel>();
const rating = ref<number>(0);

PlantService.getIndividualPlant(props.id).then(data => {
  plant.value = data;

  const r = UserService.getRating(plant.value.id);
  if(r) rating.value = r.ratingScore;
});

function handleRating(rating: number){
  if(!plant.value) return;
  UserService.addRating(plant.value.id, rating);
}
</script>

<template>
  <div class="card mb-3">
    <nav class="card-header d-flex flex-row allign-items-center">
      <button @click="$router.back()" class="btn btn-outline-primary"><i
          class="fa-solid fa-chevron-left"></i></button>
      <h1 class="ms-3">Biljka</h1>
    </nav>
  </div>

  <main class="row" v-if="plant">
    <div class="col-12 col-lg-4 mb-3">
      <section class="card">
        <img :src="plant.image_url" class="card-img" :alt="plant.image_alt">
        <div class="card-header">
          <h3 class="card-title">{{ plant.name }} <small class="text-body-secondary">{{ plant.latin_name }}</small></h3>
        </div>
        <div class="card-body">
          <p class="card-text">{{ plant.description }}</p>
          <p class="card-text text-end display-5">{{ plant.price }} {{ plant.currency }}</p>
        </div>
      </section>
    </div>
    <div class="col-12 col-lg-4 mb-3">
      <section class="card">
        <div class="card-header">
          <h3 class="card-title">Nega</h3>
        </div>
        <div class="card-body">
          <p class="card-text">{{ plant.care_instructions }}</p>
        </div>
        <div class="card-footer">
          <span class="badge text-bg-secondary">{{ plant.category }}</span>
          <span class="badge text-bg-secondary">{{ plant.season }}</span>
        </div>
      </section>
      <section class="card mt-3">
        <div class="card-header">
          <h3 class="card-title">Sadnja</h3>
        </div>
        <div class="card-body">
          <p class="card-text">{{ plant.planting_instructions }}</p>
        </div>
        <div class="card-footer">
          <span class="badge text-bg-secondary">{{ plant.plant_type }}</span>
        </div>
      </section>
      <section class="card mt-3">
        <div class="card-header">
          <h3 class="card-title">Klima</h3>
        </div>
        <div class="card-body">
          <p>{{ plant.climate }} bilje.</p>
        </div>
      </section>
      <section class="card mt-3">
        <div class="card-header">
          <h3 class="card-title">Osvetljenje</h3>
        </div>
        <div class="card-body">
          <p>{{ plant.light_requirement }}.</p>
        </div>
      </section>
    </div>
    <div class="col-12 col-lg-4">
      <section class="card mb-3">
        <div class="card-header">
          <h3 class="card-title">Dostupnost</h3>
        </div>
        <div class="card-body">
          <p class="card-text" v-if="plant.is_available">Na stanju: <strong>{{ plant.stock_quantity }}</strong></p>
          <p v-else class="card-text text-danger">Nema na stanju.</p>

          <p>Datum proizvodje: <code>{{ plant.production_date }}</code></p>
        </div>
      </section>

      <section class="card">
        <div class="card-header">
          <h3 class="card-title">Ocena</h3>
        </div>
        <div class="card-body">
          <p class="card-text">Imate mogućnost da ocenite proizvod.</p>
          <Rating v-model="rating" @click="handleRating"></Rating>
          <p v-if="!UserService.getRating(plant.id)" class="card-text text-body-secondary"><small>Nema ocena proizvoda</small></p>
        </div>
      </section>
    </div>
  </main>
</template>