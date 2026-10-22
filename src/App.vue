<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="d-flex pdki-container">
    <nav class="pdki-navigation d-flex ">
      <RouterLink to="/" class="pdki-nav-link"><i class="fa-solid fa-house fa-2xl"></i></RouterLink>
      <RouterLink to="/cart" class="pdki-nav-link"><i class="fa-solid fa-cart-shopping fa-2xl"></i></RouterLink>
      <RouterLink to="/user" class="pdki-nav-link"><i class="fa-solid fa-circle-user fa-2xl"></i></RouterLink>
    </nav>
    <div class="pdki-page">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped>
/* Horisontal navbar */
.pdki-navigation {
  background-color: green;
  height: 3rem;
  width: 100%;
  flex-direction: row;
  position: sticky;
  bottom: 0;
  align-items: center;
  justify-content: center;
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
}

@media (min-width: 75rem) {
  /* Vertical navbar */
  .pdki-navigation {
    background-color: red;
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
    max-width: calc(100vh - 3rem);
  }

  .pdki-nav-link {
    padding: 0.2rem;
    height: 3rem;
    width: 100%;
  }
}
</style>
