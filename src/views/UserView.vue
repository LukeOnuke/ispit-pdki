<script setup lang="ts">
import { useLogin } from '@/hooks/login.hook';
import { OrderStatus } from '@/models/order-status.model';
import { UserService } from '@/services/user.service';
import Rating from '@/components/Rating.vue';
import RatingDisplay from '@/components/RatingDisplay.vue';
import { useLogout } from '@/hooks/logout.hook';

const enforceLogin = useLogin();
enforceLogin();
const logoutHook = useLogout();

const user = UserService.getActiveUser();
</script>

<template>
    <div class="mt-3">
        <div class="row justify-content-center">
            <div class="col-12 col-md-6 ms-3 mb-3">
                <div class="card">
                    <div class="card-header">
                        Korisnik
                    </div>
                    <main class="card-body" v-if="user">
                        <h5 class="card-title">Podatci o korisniku</h5>
                        <hr>
                        <p><span class="text-body-secondary">Elektronska pošta: </span><strong>{{ user.email }}</strong>
                        </p>
                        <p><span class="text-body-secondary">Adresa: </span><strong>{{ user.address }}</strong></p>
                        <p><span class="text-body-secondary">Omiljene vrste: </span></p>
                        <ul>
                            <li v-for="vrsta in user.favouriteSpecies">{{ vrsta }}</li>
                            <li v-if="user.favouriteSpecies.length === 0">Korisnik nema omiljenih vrsta</li>
                        </ul>
                    </main>
                    <div class="card-footer d-flex flex-row">
                        <button class="btn btn-danger ms-auto" @click="logoutHook">Odjavi me</button>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6 ms-3 mb-3">
                <div class="card">
                    <div class="card-header">
                        Ocene
                    </div>
                    <main class="card-body" v-if="user">
                        <h5 class="card-title">Ocene</h5>
                        <hr>
                        <div v-if="user.ratings.length > 0" v-for="rating in user.ratings">
                            <RatingDisplay :rating="rating"></RatingDisplay>
                        </div>
                        <div v-if="!UserService.doRatingsExist()">
                            <p>Nemate ocena.</p>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    </div>
</template>