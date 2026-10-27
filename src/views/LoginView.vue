<script setup lang="ts">
import { AlertService } from '@/services/alert.service';
import { UserService } from '@/services/user.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const password = ref<string>();
const email = ref<string>();
const errorMessage = ref<string>();

const router = useRouter();

function login() {
    if (!email.value) {
        errorMessage.value = "Adresa elektronske pošte ne sme biti prazna."
        return
    }
    if (!password.value) {
        errorMessage.value = "Šifra ne sme biti prazna."
        return
    }

    if(!UserService.login(email.value, password.value))
        errorMessage.value = "Neispravni parametri. Proverite korisničko ime i šifru!"

    if (!errorMessage.value) {
        router.push({ path: "/" })
    }
}
</script>

<template>
    <div class="container d-flex justify-content-center align-content-center">
        <div class="card col-12 col-lg-6">
            <div class="card-header">
                Prijava
            </div>
            <form class="card-body">
                <h5 class="card-title">Prijavljivanje korisnika</h5>
                <p class="card-text">Popunite formular i pritisnite dugme "Prijavi me". Ako želite da odustanete,
                    pritisnite dugme odustani.</p>
                <hr>
                <p class="card-text text-body-secondary">Prijavom na ovaj sajt prihvatate da će se vaši podatci
                    skladištiti na našim
                    serverima. Ovaj sajt ne deli podatke sa trećim stranama. Podatcima se rukuje po zakonima Republike
                    Srbije.
                </p>

                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
                        v-model="email">
                    <label for="floatingInput">Adresa elektronske pošte</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
                        v-model="password">
                    <label for="floatingPassword">Šifra</label>
                </div>
                <p v-if="errorMessage" class="text-danger text-center mt-3">{{ errorMessage }}</p>
            </form>
            <div class="card-footer d-flex flex-row">
                <RouterLink class="btn btn-danger ms-auto" to="/">Otkaži</RouterLink>
                <button class="btn btn-primary ms-3" @click="login">Registruj se</button>
            </div>
        </div>
    </div>
</template>