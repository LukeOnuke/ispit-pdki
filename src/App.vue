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
        <h1>Biotrejd Global a.d.</h1>
        <p>Dobrodošli u Biotrejd Global a.d., vodeće ime u svetu hortikulture i
          cvetanja koje već godinama ulepšava urbane pejzaže naše prestonice. Kao
          kompanija koja upravlja pažljivo odabranim lancem modernih cvećara i
          specijalizovanih rasadnika širom Beograda, ponosimo se time što spajamo
          vrhunski kvalitet biljaka sa strastom prema prirodi. Naša misija je da svaki dom
          , poslovni prostor ili zeleni kutak obogatimo životnim duhom, stvarajući oaze
          mira i prirodne lepote usred gradske vreve.</p>
        <ul>
          <li>PIB: 123456789</li>
          <li>MB: 12345678</li>
          <li>Fiksni: 011 486 11</li>
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
  position: fixed;
  top: unset;
  bottom: 0;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.pdki-container {
  flex-direction: column-reverse;
  padding-bottom: 3rem;
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
  color: var(--bs-success)
}

.pdki-nav-link:hover{
  filter: opacity(80%)
}

.pdki-nav-link:active{
  filter: opacity(90%)
}

.pdki-nav-link.pdki-disabled{
  opacity: var(--bs-btn-disabled-opacity);
  color: var(--bs-btn-disabled-color);
}

.pdki-nav-link.router-link-exact-active{
  color: var(--bs-success-text-emphasis)
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
    position: sticky;
  }

  .pdki-container {
    flex-direction: row;
    padding-bottom: unset;
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
