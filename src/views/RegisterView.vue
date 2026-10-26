<script setup lang="ts">
import { ref } from 'vue';

const username = ref<string>();
const password = ref<string>();
const passwordAgain = ref<string>();
const email = ref<string>();
</script>

<template>
    <div class="container d-flex justify-content-center align-content-center">
        <div class="card">
            <div class="card-header">
                Registrujte se
            </div>
            <form class="card-body">
                <h5 class="card-title">Registracija novog korisnika</h5>
                <p class="card-text">Popunite formular i pritisnite dugme "Registruj se". Ako želite da odustanete,
                    pritisnite dugme odustani.</p>
                <div class="input-group mb-3">
                    <span class="input-group-text">@</span>
                    <div class="form-floating">
                        <input type="text" class="form-control" id="floatingInputGroup1" placeholder="Korisničko ime" v-model="username">
                        <label for="floatingInputGroup1">Korisničko ime</label>
                    </div>
                </div>
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="email">
                    <label for="floatingInput">Adresa elektronske pošte</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password">
                    <label for="floatingPassword">Šifra</label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="passwordAgain">
                    <label for="floatingPassword">Još jednom šifra</label>
                </div>
            </form>
            <div class="card-footer d-flex flex-row">
                <button class="btn btn-danger ms-auto">Registruj se</button>
                <button class="btn btn-primary ms-3">Registruj se</button>
            </div>
        </div>
    </div>
</template>