<script setup lang="ts">
import { LightRequirement } from '@/models/light-requirement.model';
import { PlantType } from '@/models/plant-type.model';
import type { PlantModel } from '@/models/plant.model';
import { TargetAudience } from '@/models/target-audience.model';
import { Watering } from '@/models/watering.model';
import { PlantService } from '@/services/plant.service';
import { ref } from 'vue';
import RangeSlider from '@/components/RangeSlider.vue'

let plants: PlantModel[];
const plantsFiltered = ref<PlantModel[]>();
const nameSearchString = ref<string>();
const descriptionSearchString = ref<string>();
const typeSearchCriteria = ref<PlantType>();
const targetAudienceSearchCriteria = ref<TargetAudience>();
const wateringSearchCriteria = ref<Watering>();
const lightRequirementSearchCriteria = ref<LightRequirement>();
const searchInProgress = ref<boolean>(false);
const selectedPriceRange = ref([50, 1500]);
const globalMin = ref(0);
const globalMax = ref(2000);

PlantService.getPlantsList().then((data) => {
  plants = data;
  resetFilter();
})

function filter() {
  if (!plants) return;
  console.log("filter")

  searchInProgress.value = true;

  plantsFiltered.value = plants.filter((plant) => {
    if(selectedPriceRange.value[0] && (plant.price < selectedPriceRange.value[0])) return false;
    if(selectedPriceRange.value[1] && (plant.price > selectedPriceRange.value[1])) return false;

    if (nameSearchString.value && nameSearchString.value.length > 0) {
      if (!plant.name.toLowerCase().includes(nameSearchString.value.toLowerCase())) return false;
    }

    if (descriptionSearchString.value && descriptionSearchString.value.length > 0) {
      if (!plant.description.toLowerCase().includes(descriptionSearchString.value.toLowerCase())) return false;
    }

    if (typeSearchCriteria.value) {
      if (!(plant.plant_type === typeSearchCriteria.value)) return false;
    }

    if (targetAudienceSearchCriteria.value) {
      if (!(plant.target_audience === targetAudienceSearchCriteria.value)) return false;
    }

    if (wateringSearchCriteria.value) {
      if (!(plant.watering === wateringSearchCriteria.value)) return false;
    }

    if (lightRequirementSearchCriteria.value) {
      if (!(plant.light_requirement === lightRequirementSearchCriteria.value)) return false;
    }
    return true;
  })

  searchInProgress.value = false;
}

function resetFilter() {
  if (plants) plantsFiltered.value = plants;

  let min: number = Number.MAX_SAFE_INTEGER;
  let max: number = -1;
  plants.forEach(plant => {
    if(plant.price > max) max = plant.price;
    if(plant.price < min) min = plant.price;
  });
  globalMin.value = min;
  globalMax.value = max;
  selectedPriceRange.value = [min, max];
}

</script>

<template>
  <main>
    <h1>Onlajn tržnica</h1>
    <hr>

    <section class="d-flex flex-row flex-wrap container gap-3">
      <form class="card w-100" v-if="plants">
        <div class="card-header">
          <h2>Pretraga</h2>
        </div>
        <div class="card-body">
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="nameSearchString"
              @keyup="filter">
            <label for="floatingInput"><i class="fa-solid fa-magnifying-glass"></i> Pretraga po
              <strong>nazivu</strong></label>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="" v-model="descriptionSearchString"
              @keyup="filter">
            <label for="floatingInput"><i class="fa-solid fa-magnifying-glass-plus"></i> Pretraga po
              <strong>opisu</strong></label>
          </div>

          <span class="text-muted">Pretraga po ceni</span>
          <RangeSlider v-model="selectedPriceRange" :min="globalMin" :max="globalMax" @change="filter"/>

          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                  aria-expanded="true" aria-controls="collapseOne">
                  Napredna pretraga
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <div class="row">
                    <select class="form-select col-12 col-md mt-2" aria-label="Default select example"
                      v-model="typeSearchCriteria" @click="filter">
                      <option selected :value="undefined">Pretraga po tipu biljke</option>
                      <option :value="t" v-for="t in PlantType">{{ t }}</option>
                    </select>
                    <div class="col-md-1">

                    </div>
                    <select class="form-select col-12 col-md mt-2" aria-label="Default select example"
                      v-model="targetAudienceSearchCriteria" @click="filter">
                      <option selected :value="undefined">Pretraga po potrebnom iskustvu</option>
                      <option :value="a" v-for="a in TargetAudience">{{ a }}</option>
                    </select>
                  </div>
                </div>

                <div class="accordion-body">
                  <div class="row">
                    <select class="form-select col-12 col-md mt-2" aria-label="Default select example"
                      v-model="wateringSearchCriteria" @click="filter">
                      <option selected :value="undefined">Pretraga po potrebi zalivanja</option>
                      <option :value="w" v-for="w in Watering">{{ w }}</option>
                    </select>
                    <div class="col-md-1">

                    </div>
                    <select class="form-select col-12 col-md mt-2" aria-label="Default select example"
                      v-model="lightRequirementSearchCriteria" @click="filter">
                      <option selected :value="undefined">Pretraga po poželjenom svetlu</option>
                      <option :value="l" v-for="l in LightRequirement">{{ l }}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="d-flex align-items-center">
            <div class="">
              <span v-if="plantsFiltered && !searchInProgress" class="card-text text-body-secondary fst-italic">Ukupno
                <strong>{{
                  plantsFiltered.length }}</strong>
                rezultata.</span>
              <div class="spinner-border" role="status" v-else>
                <span class="visually-hidden">Pretraga u toku...</span>
              </div>
            </div>

            <div class="ms-auto">
              <input class="btn btn-danger" type="reset" value="Obriši pretragu" @click="resetFilter">
              <button type="button" class="btn btn-primary ms-3" @click="filter">Pretaži</button>
            </div>
          </div>
        </div>
      </form>

      <div class="card mb-3 w-100" v-for="plant in plantsFiltered">
        <div class="row g-0">
          <div class="col-md-4">
            <img :src="plant.image_url" class="card-img-top" :alt="plant.image_alt">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h3 class="card-title">{{ plant.name }} <small class="text-body-secondary">{{ plant.latin_name }}</small></h3>
              <div class="">
                <span class="badge text-bg-info">{{ plant.category }}</span>
                <span class="badge text-bg-secondary ms-1">{{ plant.intended_use }}</span>
              </div>
              <p class="card-text">{{ plant.description }}</p>
              <p class="card-text">{{ plant.care_instructions }}</p>
              <p class="card-text"><small class="text-body-secondary">{{ plant.climate }} - {{ plant.light_requirement }}</small></p>
              <p class="card-text text-end display-3">{{ plant.price }} {{ plant.currency }}</p>
            </div>
          </div>
        </div>
        <div class="card-footer d-flex">
          <a href="#" class="btn btn-primary ms-auto">Додај у корпу</a>
          <a href="#" class="btn btn-primary ms-3">Детаљи</a>
        </div>
      </div>

      <div class="card mb-3 w-100 text-bg-info mb-3" v-if="plants && plantsFiltered && plantsFiltered.length === 0">
        <div class="card-header">
          <h2 class="card-title">Nijedna biljka ne ispunjava vaše kriterijume</h2>
        </div>
        <div class="card-body">
          <p class="card-text">Probajte drugacije ili manje precizne kriterijuma.</p>
        </div>
      </div>
    </section>
  </main>
</template>
