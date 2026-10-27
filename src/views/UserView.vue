<script setup lang="ts">
import { OrderStatus } from '@/models/order-status.model';
import { UserService } from '@/services/user.service';

const user = UserService.getActiveUser();
</script>

<template>
<div class="container d-flex justify-content-center align-content-center">
        <div class="card col-12 col-lg-6">
            <div class="card-header">
                Korisnik
            </div>
            <main class="card-body" v-if="user">
                <h5 class="card-title">Podatci o korisniku</h5>
                <hr>
                <p><span class="text-body-secondary">Elektronska pošta: </span><strong>{{ user.email }}</strong></p>
            </main>
            <div class="card-footer d-flex flex-row">
                <RouterLink class="btn btn-danger ms-auto" to="/user/logout">Odjavi me</RouterLink>
            </div>
        </div>
        <div class="card col-12 col-lg-6">
            <div class="card-header">
                Ocene
            </div>
            <main class="card-body" v-if="user">
                <h5 class="card-title">Pristigle biljke</h5>
                <hr>
                <div v-if="user.orders.length > 0" v-for="order in user.orders">
                    <section v-if="order.orderStatus === OrderStatus.ARRIVED" :key="`order-${order.plant.id}`">
                        <h1>{{ order.plant.name }}</h1>
                    </section>
                </div>
                <div v-else>
                    <p>Nemate pristiglih biljaka.</p>
                </div>
            </main>
            <div class="card-footer d-flex flex-row">
                <RouterLink class="btn btn-danger ms-auto" to="/user/logout">Odjavi me</RouterLink>
            </div>
        </div>
    </div>
</template>