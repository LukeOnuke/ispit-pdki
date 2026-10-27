<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Suspense } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import { UserService } from './services/user.service.ts';
</script>

<template>
  <div class="d-flex pdki-container">
    <nav class="pdki-navigation d-flex ">
      <RouterLink to="/" class="pdki-nav-link"><i class="fa-solid fa-house fa-2xl"></i></RouterLink>
      <RouterLink to="/cart" class="pdki-nav-link"><i class="fa-solid fa-cart-shopping fa-2xl"></i></RouterLink>
      <RouterLink to="/user" :class="['pdki-nav-link', UserService.getActiveUser() ? '' : 'pdki-disabled']"><i class="fa-solid fa-circle-user fa-2xl"></i></RouterLink>
    </nav>
    <div class="pdki-page">
      <Suspense>
        <RouterView></RouterView>
      </Suspense>
      <footer>
        <hr>
        <h1>Биотрејд Глобал а.д.</h1>
        <p>Добродошли у Биотрејд Глобал а.д., водеће име у свету хортикултуре и
          цветања које већ годинама улепшава урбане пејзаже наше престонице. Као
          компанија која управља пажљиво одабраним ланцем модерних цвећара и
          специјализованих расадника широм Београда, поносимо се тиме што спајамо
          врхунски квалитет биљака са страстом према природи. Наша мисија је да сваки дом
          , пословни простор или зелени кутак обогатимо животним духом, стварајући оазе
          мира и природне лепоте усред градске вреве.</p>
        <p>
          Кроз предани рад стручних агронома, флориста и пејзажних архитекта, Биотрејд
          Глобал а.д. пружа свеобухватну понуду - од јединствених цвећарских аранжмана
          за све прилике до здравих, отпорних садница спремних за ваше баште и терасе.
          Посвећени смо одрживом пословању, врхунској услузи и едукацији наших клијената,
          због чега смо постали синоним за поузданост и врхунски естетски израз у целој Србији.
        </p>
        <ul>
          <li>ПИБ: 123456789</li>
          <li>ПИБ: 12345678</li>
          <li>Фиксни: 011 486 11</li>
        </ul>
      </footer>
    </div>
  </div>
</template>

<style scoped>
/* Horisontal navbar */
.pdki-navigation {
  background-color: var(--bs-secondary-bg);
  height: 3rem;
  width: 100%;
  flex-direction: row;
  position: sticky;
  bottom: 0;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.pdki-container {
  flex-direction: column-reverse;
}

.pdki-page {
  max-width: unset;
  padding: 1rem;
}

.pdki-nav-link {
  padding: 0.2rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: var(--bs-primary-text-emphasis)
}

.pdki-nav-link.pdki-disabled{
  opacity: var(--bs-btn-disabled-opacity);
  color: var(--bs-btn-disabled-color);
}

@media (min-width: 75rem) {

  /* Vertical navbar */
  .pdki-navigation {
    height: 100vh;
    width: 3rem;
    flex-direction: column;
    bottom: unset;
    top: 0;
    justify-content: unset;
  }

  .pdki-container {
    flex-direction: row;
  }

  .pdki-page {
    max-width: calc(100vw - 3rem);
  }

  .pdki-nav-link {
    padding: 0.2rem;
    height: 3rem;
    width: 100%;
  }
}
</style>
